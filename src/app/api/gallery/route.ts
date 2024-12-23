import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ai-image-generator");
    
    const generations = await db
      .collection("generations")
      .find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .toArray();

    return NextResponse.json({ 
      success: true, 
      generations 
    });

  } catch (error) {
    console.error('Gallery fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery' },
      { status: 500 }
    );
  }
} 