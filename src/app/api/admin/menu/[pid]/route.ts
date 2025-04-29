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

  const { order, onlyMobile, active, name, url } = await getFieldsFromForm(request, ['order', 'onlyMobile', 'active', 'name', 'url']);

  const menuLink = await prisma.menuLink.update({
    where: { id: parseInt(pid) },
    data: { name, url, order: parseInt(order || '0'), onlyMobile: onlyMobile == 'true', active: active == 'true', updatedAt: new Date() },
  });

  if (menuLink) {
    return NextResponse.json(menuLink);
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
  await prisma.menuLink.delete({
    where: { id: parseInt(pid) },
  });
  return NextResponse.json({ action: 'menuLink deleted' });
}
