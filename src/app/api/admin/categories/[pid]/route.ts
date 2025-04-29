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
  await prisma.category.delete({
    where: { id: parseInt(pid) },
  });
  return NextResponse.json({ action: 'category deleted' });
}
