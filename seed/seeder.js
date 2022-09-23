const { PrismaClient } = require('@prisma/client');
const { categories } = require('./data.js');
const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.category.deleteMany();
    console.log('Deleted records in categories table');

    await prisma.$queryRaw`ALTER TABLE categories AUTO_INCREMENT = 1`;
    console.log('reset categories auto increment to 1');

    await prisma.category.createMany({
      data: categories,
    });
    console.log('Added categories data');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
