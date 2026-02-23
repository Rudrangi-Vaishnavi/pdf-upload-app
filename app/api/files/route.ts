let files: string[] = [];

export async function GET() {
  return Response.json(files);
}

export async function POST(req: Request) {
  const { url } = await req.json();
  files.push(url);
  return Response.json({ success: true });
}