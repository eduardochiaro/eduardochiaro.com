'use server';
import prisma from '@/utils/prisma';

const updateApp = async (id: string, data: { name: FormDataEntryValue | null; description: FormDataEntryValue | null }) => {
  return prisma.app.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: data.name as string,
      description: data.description as string,
      updatedAt: new Date(),
    },
  });
};

export { updateApp };
