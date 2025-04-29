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
  await prisma.bookmark.delete({
    where: { id: parseInt(pid) },
  });
  return NextResponse.json({ action: 'bookmark deleted' });
}
