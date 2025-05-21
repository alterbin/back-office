import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { publicId } = body;

    if (!publicId) {
      return NextResponse.json(
        { message: 'Public ID is required' },
        { status: 400 }
      );
    }

    // Cloudinary API credentials
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.NEXT_PUBLIC_COLLECTION_CLOUDINARY_API_KEY;
    const apiSecret = process.env.NEXT_PUBLIC_COLLECTION_CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { message: 'Missing Cloudinary credentials' },
        { status: 500 }
      );
    }

    // Create timestamp and signature for Cloudinary API authentication
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signature = await generateSignature(publicId, timestamp, apiSecret);

    const formData = new FormData();
    formData.append('public_id', publicId);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const result = await cloudinaryResponse.json();

    if (result.result === 'ok') {
      return NextResponse.json(
        { message: 'Image deleted successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Failed to delete image', cloudinaryResponse: result },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    return NextResponse.json(
      { 
        message: 'Server error while deleting image',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// Generate a signature for Cloudinary API using Web Crypto API
async function generateSignature(publicId: string, timestamp: string, apiSecret: string): Promise<string> {
  const encoder = new TextEncoder();
  const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const data = encoder.encode(stringToSign);
  
  // Generate SHA-1 hash
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  
  // Convert hash to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}