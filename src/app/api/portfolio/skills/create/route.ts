import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import getFromForm, { FieldTypes } from '@/utils/getFromForm';
import getFieldsFromForm from "@/utils/getFieldsFromForm";

export async function POST(request: NextRequest, response: NextResponse) {
  const formData = await request.formData();

  const { name, type, logo, percentage } = getFieldsFromForm(formData, ['name', 'type', 'logo', 'percentage']);

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
