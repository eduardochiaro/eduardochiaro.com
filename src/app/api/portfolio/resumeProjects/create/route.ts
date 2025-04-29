import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import fs from 'fs';
import { join } from 'path';
import { nanoid } from 'nanoid';
import getFieldsFromForm from '@/utils/getFieldsFromForm';
import mime from 'mime-types';
import getUser from '@/utils/getUser';

const uploadPath = './public/uploads/';

export async function POST(request: NextRequest) {
  const user = await getUser();
  if (!user) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }
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
  const newName = nanoid() + '.' + mime.extension(mimeType);

  try {
    // renames the file in the directory
    const buffer = Buffer.from(await image.arrayBuffer());
    fs.writeFileSync(join(uploadPath, newName), buffer);
  } catch (error) {
    console.log(error);
  }

  const file = await prisma.file.create({
    data: {
      name: name,
      path: newName,
      type: mimeType,
    },
  });

  const project = await prisma.resumeProject.create({
    data: {
      name,
      resumeId: parseInt(resumeId),
      fileId: file.id,
    },
  });
  if (project) {
    return NextResponse.json(project);
  }
  return new Response(null, {
    status: 400,
  });
}
