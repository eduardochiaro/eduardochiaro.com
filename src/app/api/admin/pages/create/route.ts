import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import getFieldsFromForm from '@/utils/getFieldsFromForm';
import edjsHTML from 'editorjs-html';
import stripTags from "@/utils/stripTags";

export async function POST(request: NextRequest, response: NextResponse) {
  const { title, slug, description, blocks_tmp } = await getFieldsFromForm(request, ['title', 'slug', 'description', 'blocks_tmp']);

  const edjsParser = edjsHTML();
  let content = edjsParser.parse(JSON.parse(blocks_tmp));

  const page = await prisma.page.create({
    data: { title, slug, description, blocks: blocks_tmp, content: content.join("\n"), plaintext: stripTags(content.join("\n\n")), createdAt: new Date() },
  });
  if (page) {
    return NextResponse.json(page);
  }
  return new Response(null, {
    status: 400,
  });
}
