import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import fs from 'fs';
import { join } from 'path';
import { nanoid } from 'nanoid';
import getFieldsFromForm from '@/utils/getFieldsFromForm';
import moment from 'moment';
import mime from 'mime-types';

const uploadPath = './public/uploads/';

export async function POST(request: NextRequest, response: NextResponse) {
  const { company, name, description, startDate, endDate, tags, image } = await getFieldsFromForm(
    request,
    ['company', 'name', 'description', 'startDate', 'endDate', 'tags'],
    ['image'],
  );

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
    // reresumes the file in the directory
    const buffer = Buffer.from(await image.arrayBuffer());
    fs.writeFileSync(join(uploadPath, newName), buffer);
  } catch (error) {
    console.log(error);
  }

  const parsedTags = JSON.parse(tags);
  const newTags = parsedTags
    .filter((x: any) => x.new && !x.deleted && x.id == null)
    ?.map((x: any) => {
      return { name: x.name };
    });
  const appendTags = parsedTags
    .filter((x: any) => x.new && !x.deleted && x.id > 0)
    ?.map((x: any) => {
      return { id: x.id };
    });

  const dataMap = {
    name,
    company,
    description,
    startDate: startDate ? moment(startDate).toISOString() : null,
    endDate: endDate ? moment(endDate).toISOString() : null,
    createdAt: new Date(),
    tags: {
      create: newTags,
      connect: appendTags,
    },
    file: {
      create: {
        name: name,
        path: newName,
        type: mimeType,
      },
    },
  };

  const resume = await prisma.resume.create({
    data: { ...dataMap },
    include: {
      tags: true,
      projects: true,
    },
  });
  if (resume) {
    return NextResponse.json(resume);
  }
  return new Response(null, {
    status: 400,
  });
}
