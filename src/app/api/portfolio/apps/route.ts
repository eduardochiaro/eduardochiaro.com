import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, response: NextResponse) {
  const apps = await prisma.app.findMany({
    where: {
      deletedAt: null,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  if (apps) {
    return NextResponse.json({ results: apps });
  }
  return new Response(null, {
    status: 400,
  });
}
