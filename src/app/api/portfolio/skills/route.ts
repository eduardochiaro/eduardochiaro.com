import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

export async function GET(request: NextRequest, response: NextResponse) {
  const skills = await prisma.skill.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  if (skills) {
    return NextResponse.json({ results: skills });
  }
  return new Response(null, {
    status: 400,
  });
}
