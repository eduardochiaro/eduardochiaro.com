import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import getFieldsFromForm from '@/utils/getFieldsFromForm';

export async function PUT(
  request: NextRequest,
  props: {
    params: Promise<{ pid: string }>;
  },
) {
  const params = await props.params;
  const { pid } = params;

  const { name, type, logo, percentage } = await getFieldsFromForm(request, ['name', 'type', 'logo', 'percentage']);

  const skill = await prisma.skill.update({
    where: { id: parseInt(pid) },
    data: { name, type, logo, percentage: parseInt(percentage), updatedAt: new Date() },
  });

  if (skill) {
    return NextResponse.json(skill);
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
  const params = await props.params;
  const { pid } = params;
  await prisma.skill.delete({
    where: { id: parseInt(pid) },
  });
  return NextResponse.json({ action: 'skill deleted' });
}
