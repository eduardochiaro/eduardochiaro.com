import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import getFieldsFromForm from '@/utils/getFieldsFromForm';

export async function POST(request: NextRequest) {
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
