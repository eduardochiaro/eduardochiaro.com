import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import fs from 'fs';
import { join } from 'path';
import { nanoid } from 'nanoid';
import getFieldsFromForm from '@/utils/getFieldsFromForm';
import mime from 'mime-types';

const uploadPath = './public/uploads/';

export async function POST(request: NextRequest, response: NextResponse) {
  const { name, description, url, image } = await getFieldsFromForm(request, ['name', 'description', 'url'], ['image']);

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

  const app = await prisma.app.create({
    data: {
      name,
      description,
      url,
      file: {
        create: {
          name: name,
          path: newName,
          type: mimeType,
        },
      },
      createdAt: new Date(),
    },
  });
  if (app) {
    return NextResponse.json(app);
  }
  return new Response(null, {
    status: 400,
  });
}
