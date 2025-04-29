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
  const { url, name, description, categoryId } = await getFieldsFromForm(request, ['url', 'name', 'description', 'categoryId']);

  const bookmark = await prisma.bookmark.create({
    data: { url, name, description, categoryId: parseInt(categoryId) },
  });
  if (bookmark) {
    return NextResponse.json(bookmark);
  }
  return new Response(null, {
    status: 400,
  });
}
