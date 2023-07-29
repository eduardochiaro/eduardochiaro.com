import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import getFieldsFromForm from "@/utils/getFieldsFromForm";

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: { pid: string };
  },
) {
  const { pid } = params;
  const formData = await request.formData();
  const { name, type, logo, percentage } = getFieldsFromForm(formData, ['name', 'type', 'logo', 'percentage']);

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
  {
    params,
  }: {
    params: { pid: string };
  },
) {
  const { pid } = params;
  await prisma.skill.update({
    where: { id: parseInt(pid) },
    data: { deletedAt: new Date() },
  });
  return NextResponse.json({ action: 'skill deleted' });
}
