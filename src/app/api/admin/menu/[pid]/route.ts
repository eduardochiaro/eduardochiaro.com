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
  {
    params,
  }: {
    params: { pid: string };
  },
) {
  const { pid } = params;
  await prisma.menuLink.delete({
    where: { id: parseInt(pid) },
  });
  return NextResponse.json({ action: 'menuLink deleted' });
}
