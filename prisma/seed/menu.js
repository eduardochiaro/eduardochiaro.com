const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const menuLinks = [
  {
    id: 1,
    name: 'Home',
    url: '/',
    order: 1,
    active: true,
    onlyMobile: false,
  },
  {
    id: 2,
    name: 'Bookmarks',
    url: '/bookmarks',
    order: 2,
    active: false,
    onlyMobile: false,
  },
  {
    id: 3,
    name: 'Projects',
    url: '/projects',
    order: 3,
    active: true,
    onlyMobile: false,
  },
];

const seed = async () => {
  await prisma.menuLink.deleteMany();
  console.log('Deleted records in menu links table');

  await prisma.$queryRaw`ALTER TABLE MenuLink AUTO_INCREMENT = 1`;
  console.log('reset menu links auto increment to 1');

  await prisma.menuLink.createMany({
    data: menuLinks,
  });
  console.log('Added menu links data');
}

module.exports = seed;
