import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename') || 'file.pdf';

  // Get the actual file from the request body
  const blob = await put(filename, request.body as any, {
    access: 'public',
  });

  return NextResponse.json(blob);
}
