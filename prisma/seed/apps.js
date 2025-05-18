const { PrismaClient } = require('@/utils/prismaClient');
const prisma = new PrismaClient();

const apps = [
  {
    name: 'Impact (v2.0.0)',
    description: 'Ghost blog theme using TailwindCSS',
    url: "https://github.com/eduardochiaro/Impact",
    file: {
      create: {
        name: 'Impact',
        path: 'impact.png',
        type: 'image/png',
      }
    }
  },
  {
    name: 'CompactLine',
    description: 'Oh My Zsh theme',
    url: "https://github.com/eduardochiaro/compactline",
    file: {
      create: {
        name: 'CompactLine',
        path: 'compactline.png',
        type: 'image/png',
      }
    }
  },
];

const seed = async () => {
  await prisma.app.deleteMany();
  console.log('Deleted records in apps table');

  await prisma.$queryRaw`ALTER TABLE App AUTO_INCREMENT = 1`;
  console.log('reset apps auto increment to 1');

  await apps.map(async (app) => {
    await prisma.app.create({
      data: app,
    });
  });
  console.log('Added apps data');
}

module.exports = seed;
