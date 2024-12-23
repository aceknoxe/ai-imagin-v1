import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { checkContentSafety } from '@/utils/contentFilter';

const HF_API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Check content safety
    const safetyCheck = checkContentSafety(prompt);
    if (!safetyCheck.safe) {
      return NextResponse.json(
        { 
          error: 'Content restricted',
          message: 'Your prompt contains restricted content. Please keep it family-friendly.',
          reason: safetyCheck.reason
        },
        { status: 403 }
      );
    }

    // Generate image using HuggingFace API
    const response = await fetch(HF_API_URL, {
      headers: {
        "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      throw new Error(`HuggingFace API error: ${response.statusText}`);
    }

    const imageBlob = await response.blob();
    const imageBuffer = Buffer.from(await imageBlob.arrayBuffer());
    const base64Image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("ai-image-generator");
    const generationsCollection = db.collection("generations");

    // Save generation to database
    const generation = {
      prompt,
      imageUrl: base64Image,
      createdAt: new Date(),
    };

    await generationsCollection.insertOne(generation);

    // Check and maintain only latest 20 images
    const totalGenerations = await generationsCollection.countDocuments();
    if (totalGenerations > 20) {
      const oldestGenerations = await generationsCollection
        .find({})
        .sort({ createdAt: 1 })
        .limit(totalGenerations - 20)
        .toArray();

      // Delete oldest generations
      await generationsCollection.deleteMany({
        _id: { 
          $in: oldestGenerations.map(gen => gen._id)
        }
      });
    }

    return NextResponse.json({ 
      success: true,
      imageUrl: base64Image,
      id: generation._id
    });

  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
} 