'use server';
import prisma from '@/utils/prisma';
import { deleteFile, uploadFile } from '@/utils/files';

type AppData = {
  name: FormDataEntryValue | null;
  description: FormDataEntryValue | null;
  url: FormDataEntryValue | null;
  file?: FormDataEntryValue | null;
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

async function deleteApp(id: string) {
  const app = await prisma.app.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      file: true,
    },
  });
  if (!app) {
    throw new Error('App not found');
  }
  // delete file from disk
  if (app.file) {
    deleteFile(app.file.path, 'public/uploads');
  }
  // delete app from database
  await prisma.app.delete({
    where: {
      id: parseInt(id),
    },
  });
  return app;
}

const getApps = async () => {
  return prisma.app.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      file: true,
    },
  });
};

export { getApps, updateApp, addApp, deleteApp };
