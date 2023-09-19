import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import getFieldsFromForm from '@/utils/getFieldsFromForm';
import fromEditorToHTML from '@/utils/fromEditorToHTML';

export async function POST(request: NextRequest, response: NextResponse) {
  const { title, slug, description, blocks_tmp } = await getFieldsFromForm(request, ['title', 'slug', 'description', 'blocks_tmp']);

  const { content, plaintext } = fromEditorToHTML(blocks_tmp);

  const page = await prisma.page.create({
    data: { title, slug, description, blocks: blocks_tmp, content, plaintext, createdAt: new Date() },
  });
  if (page) {
    return NextResponse.json(page);
  }
  return new Response(null, {
    status: 400,
  });
}
