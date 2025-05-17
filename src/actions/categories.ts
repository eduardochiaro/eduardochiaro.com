'use server';
import prisma from '@/utils/prisma';

type CategoryData = {
  name: FormDataEntryValue | null;
  type?: FormDataEntryValue | null;
};

async function addCategory(data: CategoryData) {
  const categoryData: any = {
    name: data.name as string,
    type: data.type as string,
    createdAt: new Date(),
  };
  return prisma.category.create({
    data: {
      ...categoryData,
    },
  });
}

const updateCategory = async (id: string, data: CategoryData) => {
  const categoryData: any = {
    name: data.name as string,
    type: data.type as string,
    updatedAt: new Date(),
  };
  return prisma.category.update({
    where: {
      id: parseInt(id),
    },
    data: categoryData,
  });
};

const deleteCategory = async (id: string) => {
  return prisma.category.delete({
    where: {
      id: parseInt(id),
    },
  });
};

const getCategories = async () => {
  return prisma.category.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      bookmarks: true,
    },
  });
};

export { addCategory, updateCategory, deleteCategory, getCategories };
