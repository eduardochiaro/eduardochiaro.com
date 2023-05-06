const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const apps = [
  {
    id: 1,
    name: 'Impact (v2.0.0)',
    description: 'Ghost blog theme using TailwindCSS',
    url: "https://github.com/eduardochiaro/Impact",
    image: 'impact.png',
  },
  {
    id: 2,
    name: 'CompactLine',
    description: 'Oh My Zsh theme',
    url: "https://github.com/eduardochiaro/compactline",
    image: 'compactline.png',
  },
];

const seed = async () => {
  await prisma.app.deleteMany();
  console.log('Deleted records in apps table');

  await prisma.$queryRaw`ALTER TABLE apps AUTO_INCREMENT = 1`;
  console.log('reset apps auto increment to 1');

  await prisma.app.createMany({
    data: apps,
  });
  console.log('Added apps data');
}

module.exports = seed;
