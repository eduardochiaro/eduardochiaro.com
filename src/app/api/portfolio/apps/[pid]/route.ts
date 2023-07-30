import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import fs from 'fs';
import { join } from 'path';
import { nanoid } from 'nanoid';
import { rmFile } from 'rm-file';
import getFieldsFromForm from '@/utils/getFieldsFromForm';
import mime from 'mime-types';

const uploadPath = './public/uploads/';

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: { pid: string };
  },
) {
  const { pid } = params;
  const appReturn = await prisma.app.findFirst({
    where: {
      id: parseInt(pid),
    },
  });
  if (!appReturn) {
    return NextResponse.json(
      { error: 'Record doesnt exist' },
      {
        status: 404,
      },
    );
  }

  const { name, description, url, image } = await getFieldsFromForm(request, ['name', 'description', 'url'], ['image']);

  const data: { [key: string]: any } = { name, description, url, updatedAt: new Date() };

  if (typeof image == 'object') {
    const mimeType = image.type;
    const newName = nanoid() + '.' + mime.extension(mimeType);

    try {
      // renames the file in the directory
      const buffer = Buffer.from(await image.arrayBuffer());
      fs.writeFileSync(join(uploadPath, newName), buffer);
    } catch (error) {
      console.log(error);
    }
    data['image'] = newName;
  }

  const app = await prisma.app.update({
    where: { id: parseInt(pid) },
    data,
  });

  if (app) {
    return NextResponse.json(app);
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
  const appReturn = await prisma.app.findFirst({
    where: {
      id: parseInt(pid),
    },
  });
  await prisma.app.delete({
    where: { id: parseInt(pid) },
  });
  if (appReturn && appReturn.image) {
    await rmFile(`${uploadPath}${appReturn.image}`);
  }
  return NextResponse.json({ action: 'app deleted' });
}
