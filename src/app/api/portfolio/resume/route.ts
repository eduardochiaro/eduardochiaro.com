import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

export async function GET(request: NextRequest, response: NextResponse) {
  const resumes = await prisma.resume.findMany({
    orderBy: {
      startDate: 'desc',
    },
    include: {
      tags: true,
      projects: true,
    },
  });
  if (resumes) {
    return NextResponse.json({ results: resumes });
  }
  return new Response(null, {
    status: 400,
  });
}
