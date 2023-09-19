import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import fs from 'fs';
import { join } from 'path';
import { nanoid } from 'nanoid';
import getFieldsFromForm from '@/utils/getFieldsFromForm';
import mime from 'mime-types';

const uploadPath = './public/uploads/';

export async function POST(request: NextRequest, response: NextResponse) {
  const { file } = await getFieldsFromForm(request, [], ['file']);

  //const file = formData.get("image") as Blob | null;
  if (!file) {
    return NextResponse.json(
      { error: 'File is required' },
      {
        status: 400,
      },
    );
  }

  const mimeType = file.type;
  const newName = nanoid() + '.' + mime.extension(mimeType);

  try {
    // renames the file in the directory
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(join(uploadPath, newName), buffer);
    return NextResponse.json({data: uploadPath + newName});
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error },
      {
        status: 400,
      },
    );
	}
}