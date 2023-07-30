import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import getFieldsFromForm from '@/utils/getFieldsFromForm';

export async function POST(request: NextRequest, response: NextResponse) {
  const { name } = await getFieldsFromForm(request, ['name']);

  const resumeTag = await prisma.resumeTag.create({
    data: { name },
  });
  if (resumeTag) {
    return NextResponse.json(resumeTag);
  }
  return new Response(null, {
    status: 400,
  });
}
