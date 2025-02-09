'use server';
import prisma from '@/utils/prisma';
import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import mime from 'mime-types';

async function uploadFile(file: File, path: string) {
  const data = await file.arrayBuffer();

  const mimeType = file.type;
  const newName = nanoid() + '.' + mime.extension(mimeType);
  // save file to disk
  await fs.appendFile(`${path}/${newName}`, Buffer.from(data));

  return {
    name: newName,
    type: mimeType,
  };
}

type AppData = {
  name: FormDataEntryValue | null;
  description: FormDataEntryValue | null;
  url: FormDataEntryValue | null;
  file?: FormDataEntryValue;
};

const updateApp = async (id: string, data: AppData) => {
  const appData: any = {
    name: data.name as string,
    description: data.description as string,
    url: data.url as string,
    updatedAt: new Date(),
  };
  if (data.file && data.file instanceof File) {
    const fileUploaded = await uploadFile(data.file, 'public/uploads');
    appData['file'] = {
      create: {
        name: data.name as string,
        path: fileUploaded.name,
        type: fileUploaded.type,
      },
    };
  }
  return prisma.app.update({
    where: {
      id: parseInt(id),
    },
    data: appData,
  });
};

export { updateApp };
