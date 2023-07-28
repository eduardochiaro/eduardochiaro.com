import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
	response: NextResponse
) {
  const skills = await prisma.skill.findMany({
    where: {
      deletedAt: null,
    },
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