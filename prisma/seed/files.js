const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const seed = async () => {
  await prisma.file.deleteMany();
  console.log('Deleted records in files table for key');

  await prisma.$queryRaw`ALTER TABLE files AUTO_INCREMENT = 1`;
  console.log('reset files auto increment to 1');
}

module.exports = seed;
