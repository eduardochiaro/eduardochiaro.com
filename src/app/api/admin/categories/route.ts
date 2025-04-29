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
