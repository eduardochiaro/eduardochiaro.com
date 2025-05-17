'use server';
import prisma from '@/utils/prisma';

const getTags = async () => {
  return prisma.resumeTag.findMany({
    orderBy: {
      id: 'desc',
    },
    include: {
      _count: {
        select: {
          jobs: true,
        },
      },
    },
  });
};

const addTag = async (tagName: string) => {
  return prisma.resumeTag.create({
    data: {
      name: tagName,
    },
  });
};

const updateTag = async (tagId: number, tagName: string) => {
  return prisma.resumeTag.update({
    where: {
      id: tagId,
    },
    data: {
      name: tagName,
    },
  });
};

const deleteTag = async (tagId: number) => {
  return prisma.resumeTag.delete({
    where: {
      id: tagId,
    },
  });
};

export { getTags, addTag, updateTag, deleteTag };
