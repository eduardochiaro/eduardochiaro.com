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

  const { name, type } = await getFieldsFromForm(request, ['name', 'type']);

  const category = await prisma.category.update({
    where: { id: parseInt(pid) },
    data: { name, type, updatedAt: new Date() },
  });

  if (category) {
    return NextResponse.json(category);
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
  await prisma.category.delete({
    where: { id: parseInt(pid) },
  });
  return NextResponse.json({ action: 'category deleted' });
}
