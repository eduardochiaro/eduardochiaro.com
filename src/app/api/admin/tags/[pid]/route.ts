import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import getFieldsFromForm from '@/utils/getFieldsFromForm';

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: { pid: string };
  },
) {
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
  {
    params,
  }: {
    params: { pid: string };
  },
) {
  const { pid } = params;
  await prisma.resumeTag.delete({
    where: { id: parseInt(pid) },
  });
  return NextResponse.json({ action: 'resumeTag deleted' });
}
