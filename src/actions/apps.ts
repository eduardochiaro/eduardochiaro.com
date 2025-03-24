'use server';
import prisma from '@/utils/prisma';
import uploadFile from '@/utils/uploadFile';

type AppData = {
  name: FormDataEntryValue | null;
  description: FormDataEntryValue | null;
  url: FormDataEntryValue | null;
  file?: FormDataEntryValue | null;
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

async function addApp(data: AppData) {
  const appData: any = {
    name: data.name as string,
    description: data.description as string,
    url: data.url as string,
    createdAt: new Date(),
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
  return prisma.app.create({
    data: {
      ...appData,
    },
  });
}

export { updateApp, addApp };
