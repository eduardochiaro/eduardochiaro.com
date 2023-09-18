import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

export async function GET(request: NextRequest, response: NextResponse) {
  const pages = await prisma.page.findMany({
    orderBy: {
      title: 'asc',
    },
  });
  if (pages) {
    return NextResponse.json({ results: pages });
  }
  return new Response(null, {
    status: 400,
  });
}
