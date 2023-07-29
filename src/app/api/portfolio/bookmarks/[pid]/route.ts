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

  const { url, name, description, categoryId } = await getFieldsFromForm(request, ['url', 'name', 'description', 'categoryId']);

  const bookmark = await prisma.bookmark.update({
    where: { id: parseInt(pid) },
    data: { url, name, description, categoryId: parseInt(categoryId), updatedAt: new Date() },
  });

  if (bookmark) {
    return NextResponse.json(bookmark);
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
  await prisma.bookmark.delete({
    where: { id: parseInt(pid) },
  });
  return NextResponse.json({ action: 'bookmark deleted' });
}
