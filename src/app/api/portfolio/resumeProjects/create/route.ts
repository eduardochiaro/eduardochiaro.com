import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import fs from 'fs';
import { join } from 'path';
import { v4 as uuid } from 'uuid';
import getFieldsFromForm from '@/utils/getFieldsFromForm';
import mime from "mime-types";

const uploadPath = './public/uploads/';

export async function POST(request: NextRequest, response: NextResponse) {
  const { name, resumeId, image } = await getFieldsFromForm(request, ['name', 'resumeId'], ['image']);

  //const file = formData.get("image") as Blob | null;
  if (!image) {
    return NextResponse.json(
      { error: 'File is required' },
      {
        status: 400,
      },
    );
  }

  const mimeType = image.type;
  const newName = uuid() + '.' + mime.extension(mimeType);

  try {
    // renames the file in the directory
    const buffer = Buffer.from(await image.arrayBuffer());
    fs.writeFileSync(join(uploadPath, newName), buffer);
  } catch (error) {
    console.log(error);
  }

  const resumeProject = await prisma.resumeProject.create({
    data: { name, resumeId: parseInt(resumeId), image: newName, createdAt: new Date() },
  });
  if (resumeProject) {
    return NextResponse.json(resumeProject);
  }
  return new Response(null, {
    status: 400,
  });
}
