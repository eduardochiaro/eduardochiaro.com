import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, response: NextResponse) {
  const resumeTags = await prisma.resumeTag.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  if (resumeTags) {
    return NextResponse.json({ results: resumeTags });
  }
  return new Response(null, {
    status: 400,
  });
}
