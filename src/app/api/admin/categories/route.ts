import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, response: NextResponse) {
  const menuLinks = await prisma.menuLink.findMany({
    orderBy: {
      order: 'asc',
    },
  });
  if (menuLinks) {
    return NextResponse.json({ results: menuLinks });
  }
  return new Response(null, {
    status: 400,
  });
}
