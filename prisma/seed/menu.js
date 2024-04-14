const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const menuLinks = [
  {
    name: 'Resume',
    url: '/resume',
    order: 1,
    active: true,
    onlyMobile: false,
  },
  {
    name: 'Books',
    url: '/books',
    order: 2,
    active: true,
    onlyMobile: false,
  },
  {
    name: 'Bookmarks',
    url: '/bookmarks',
    order: 2,
    active: true,
    onlyMobile: false,
  },
  {
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
