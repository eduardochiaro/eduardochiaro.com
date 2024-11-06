import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import fs from 'fs';
import { join } from 'path';
import { nanoid } from 'nanoid';
import { rmFile } from 'rm-file';
import getFieldsFromForm from '@/utils/getFieldsFromForm';
import moment from 'moment';
import mime from 'mime-types';

const uploadPath = './public/uploads/';

export async function PUT(
  request: NextRequest,
  props: {
    params: Promise<{ pid: string }>;
  },
) {
  const params = await props.params;
  const { pid } = params;
  const resumeReturn = await prisma.resume.findFirst({
    where: {
      id: parseInt(pid),
    },
  });
  if (!resumeReturn) {
    return NextResponse.json(
      { error: 'Record doesnt exist' },
      {
        status: 404,
      },
    );
  }

  const { company, name, description, startDate, endDate, tags, image } = await getFieldsFromForm(
    request,
    ['company', 'name', 'description', 'startDate', 'endDate', 'tags'],
    ['image'],
  );

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
  const deletedTags = parsedTags
    .filter((x: any) => x.deleted && x.id > 0)
    ?.map((x: any) => {
      return { id: x.id };
    });

  const data: { [key: string]: any } = {
    name,
    company,
    description,
    startDate: startDate ? moment(startDate).toISOString() : null,
    endDate: endDate ? moment(endDate).toISOString() : null,
    updatedAt: new Date(),
    tags: {
      create: newTags,
      connect: appendTags,
      disconnect: deletedTags,
    },
  };

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
    data['file'] = {
      create: {
        name: name,
        path: newName,
        type: mimeType,
      },
    };
  }

  const resume = await prisma.resume.update({
    where: { id: parseInt(pid) },
    data,
    include: {
      tags: true,
      projects: true,
      file: true,
    },
  });

  if (resume) {
    return NextResponse.json(resume);
  }
  return new Response(null, {
    status: 400,
  });
}

export async function DELETE(
  request: NextRequest,
  props: {
    params: Promise<{ pid: string }>;
  },
) {
  const params = await props.params;
  const { pid } = params;
  await prisma.resume.delete({
    where: { id: parseInt(pid) },
  });
  return NextResponse.json({ action: 'resume deleted' });
}
