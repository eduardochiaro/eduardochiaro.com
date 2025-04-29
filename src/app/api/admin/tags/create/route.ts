import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import getFieldsFromForm from '@/utils/getFieldsFromForm';
import getUser from '@/utils/getUser';

export async function POST(request: NextRequest) {
  const user = await getUser();
  if (!user) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }
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
