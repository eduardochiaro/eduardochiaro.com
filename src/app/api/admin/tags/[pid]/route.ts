import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import getFieldsFromForm from '@/utils/getFieldsFromForm';
import getUser from '@/utils/getUser';

export async function PUT(
  request: NextRequest,
  props: {
    params: Promise<{ pid: string }>;
  },
) {
  const user = await getUser();
  if (!user) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }
  const params = await props.params;
  const { pid } = params;

  const { name } = await getFieldsFromForm(request, ['name']);

  const resumeTag = await prisma.resumeTag.update({
    where: { id: parseInt(pid) },
    data: { name },
  });

  if (resumeTag) {
    return NextResponse.json(resumeTag);
  }
  return new Response(null, {
    status: 400,
  });
}

export async function DELETE(
  request: NextRequest,
  props: {
    params: Promise<{ pid: string }>;
  },
) {
  const user = await getUser();
  if (!user) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }
  const params = await props.params;
  const { pid } = params;
  await prisma.resumeTag.delete({
    where: { id: parseInt(pid) },
  });
  return NextResponse.json({ action: 'resumeTag deleted' });
}
