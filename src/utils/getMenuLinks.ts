import prisma from '@/utils/prisma';
import { cache } from 'react';

const getMenuLinks = cache(async () => {
  return prisma.menuLink.findMany({
    orderBy: {
      order: 'asc',
    },
  });
});
export default getMenuLinks;
