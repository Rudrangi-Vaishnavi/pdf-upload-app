import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET() {
  // This fetches the list of all files you've uploaded to Vercel Blob
  const { blobs } = await list();
  return NextResponse.json(blobs);
}
