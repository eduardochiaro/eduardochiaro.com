const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const skills = [
  {
    id: 1,
    name: 'Node.js',
    logo: 'node.svg',
    type: 'node',
    percentage: 85,
  },
  {
    id: 2,
    name: 'HTML5',
    logo: 'html5.svg',
    type: 'html',
    percentage: 100,
  },
  {
    id: 3,
    name: 'CSS3',
    logo: 'css3.svg',
    type: 'css',
    percentage: 85,
  },
  {
    id: 4,
    name: 'PHP',
    logo: 'php.svg',
    type: 'php',
    percentage: 95,
  },
  {
    id: 5,
    name: 'SQL',
    logo: 'mysql.svg',
    type: 'mysql',
    percentage: 80,
  },
  {
    id: 6,
    name: 'AWS',
    logo: 'aws.svg',
    type: 'aws',
    percentage: 75,
  },
];

const seed = async () => {
  await prisma.skill.deleteMany();
  console.log('Deleted records in skills table');

  await prisma.$queryRaw`ALTER TABLE skills AUTO_INCREMENT = 1`;
  console.log('reset skills auto increment to 1');

  await prisma.skill.createMany({
    data: skills,
  });
  console.log('Added skills data');
}

module.exports = seed;
