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
  const { order, onlyMobile, active, name, url } = await getFieldsFromForm(request, ['order', 'onlyMobile', 'active', 'name', 'url']);

  const menuLink = await prisma.menuLink.create({
    data: { name, url, order: parseInt(order || '0'), onlyMobile: onlyMobile == 'true', active: active == 'true', createdAt: new Date() },
  });
  if (menuLink) {
    return NextResponse.json(menuLink);
  }
  return new Response(null, {
    status: 400,
  });
}
