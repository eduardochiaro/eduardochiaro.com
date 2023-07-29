import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import getFromForm, { FieldTypes } from '@/utils/getFromForm';
import getFieldsFromForm from "@/utils/getFieldsFromForm";

export async function POST(request: NextRequest, response: NextResponse) {

  const { url, name, description, categoryId } = await getFieldsFromForm(request, ['url', 'name', 'description', 'categoryId']);

  const bookmark = await prisma.bookmark.create({
    data: { url, name, description, categoryId: parseInt(categoryId), createdAt: new Date() },
  });
  if (bookmark) {
    return NextResponse.json(bookmark);
  }
  return new Response(null, {
    status: 400,
  });
}
