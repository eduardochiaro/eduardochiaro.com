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
  const { name, type, logo, percentage } = await getFieldsFromForm(request, ['name', 'type', 'logo', 'percentage']);

  const skill = await prisma.skill.create({
    data: { name, type, logo, percentage: parseInt(percentage || '0'), createdAt: new Date() },
  });
  if (skill) {
    return NextResponse.json(skill);
  }
  return new Response(null, {
    status: 400,
  });
}
