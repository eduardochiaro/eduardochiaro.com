const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
  {
    id: 1,
    name: 'Design',
    type: 'BOOKMARK',
  },
  {
    id: 2,
    name: 'Tools',
    type: 'BOOKMARK',
  },
  {
    id: 3,
    name: 'Articles',
    type: 'BOOKMARK',
  },
  {
    id: 4,
    name: 'Coding',
    type: 'BOOKMARK',
  },
];

const seed = async () => {
  await prisma.bookmark.deleteMany();
  console.log('Deleted records in bookmars table for key');
  await prisma.category.deleteMany();
  console.log('Deleted records in categories table');

  await prisma.$queryRaw`ALTER TABLE Category AUTO_INCREMENT = 1`;
  console.log('reset categories auto increment to 1');

  await prisma.category.createMany({
    data: categories,
  });
  console.log('Added categories data');
}

module.exports = seed;
