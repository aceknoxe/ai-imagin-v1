import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    // Convert base64 to buffer
    const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Get original image metadata
    const metadata = await sharp(imageBuffer).metadata();
    const originalWidth = metadata.width || 512;
    const originalHeight = metadata.height || 512;

    // Process image with Sharp
    const upscaledBuffer = await sharp(imageBuffer)
      .resize(originalWidth * 2, originalHeight * 2, {
        kernel: 'lanczos3',
        fit: 'contain',
        position: 'center',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .sharpen({
        sigma: 1,
        m1: 0.5,
        m2: 0.5
      })
      .modulate({
        brightness: 1.05, // Slight brightness boost
        saturation: 1.1   // Slight saturation boost
      })
      .toFormat('png', {
        quality: 90,
        compression: 9
      })
      .toBuffer();

    // Convert back to base64
    const upscaledBase64 = `data:image/png;base64,${upscaledBuffer.toString('base64')}`;

    return NextResponse.json({ 
      success: true, 
      upscaledUrl: upscaledBase64
    });

  } catch (error) {
    console.error('Upscale error:', error);
    return NextResponse.json(
      { error: 'Failed to upscale image' },
      { status: 500 }
    );
  }
} 