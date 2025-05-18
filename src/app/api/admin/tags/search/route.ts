import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

export async function GET(request: NextRequest, response: NextResponse) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') as string;

  const resumeTags = await prisma.resumeTag.findMany({
    where: {
      name: {
        contains: text,
      },
    },
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
