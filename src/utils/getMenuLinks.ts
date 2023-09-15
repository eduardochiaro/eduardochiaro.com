import prisma from '@/utils/prisma';

export default async function getMenuLinks() {
  return prisma.menuLink.findMany({
    orderBy: {
      order: 'asc',
    },
  });
}
