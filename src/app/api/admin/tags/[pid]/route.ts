import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import getFieldsFromForm from '@/utils/getFieldsFromForm';

export async function PUT(
  request: NextRequest,
  props: {
    params: Promise<{ pid: string }>;
  },
) {
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
  const params = await props.params;
  const { pid } = params;
  await prisma.resumeTag.delete({
    where: { id: parseInt(pid) },
  });
  return NextResponse.json({ action: 'resumeTag deleted' });
}
