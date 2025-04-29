import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import getUser from '@/utils/getUser';

export async function GET(request: NextRequest) {
  const user = await getUser();
  if (!user) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }
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
