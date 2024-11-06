import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import getFieldsFromForm from '@/utils/getFieldsFromForm';

export async function POST(request: NextRequest) {
  const { name, type } = await getFieldsFromForm(request, ['name', 'type']);

  const category = await prisma.category.create({
    data: { name, type, createdAt: new Date() },
  });
  if (category) {
    return NextResponse.json(category);
  }
  return new Response(null, {
    status: 400,
  });
}
