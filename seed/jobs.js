const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const moment = require('moment');

const jobs = [
  {
    id: 1,
    name: 'Verizon',
    logo: 'Verizon_logo.svg',
    disclaimer: '',
    startDate: moment('2017-06-01').toISOString(),
    endDate: null,
  },
  {
    id: 2,
    name: 'Getty Images',
    logo: 'Getty_Images_logo.svg',
    disclaimer: '',
    startDate: moment('2016-05-01').toISOString(),
    endDate: moment('2016-11-01').toISOString(),
  },
  {
    id: 3,
    name: 'HP',
    logo: 'HP_logo.svg',
    disclaimer: 'Projects done through Flixmedia LTD',
    startDate: moment('2011-06-01').toISOString(),
    endDate: moment('2016-03-01').toISOString(),
  },
  {
    id: 4,
    name: 'Samsung',
    logo: 'Samsung_logo.svg',
    disclaimer: 'Projects done through Flixmedia LTD',
    startDate: moment('2011-06-01').toISOString(),
    endDate: moment('2016-03-01').toISOString(),
  },
  {
    id: 5,
    name: 'Microsoft',
    logo: 'Microsoft_logo.svg',
    disclaimer: 'Projects done through Flixmedia LTD',
    startDate: moment('2011-06-01').toISOString(),
    endDate: moment('2016-03-01').toISOString(),
  },
  {
    id: 6,
    name: 'LG',
    logo: 'LG_logo.svg',
    disclaimer: 'Projects done through Flixmedia LTD',
    startDate: moment('2011-06-01').toISOString(),
    endDate: moment('2016-03-01').toISOString(),
  },
];

const seed = async () => {
  await prisma.job.deleteMany();
  console.log('Deleted records in jobs table');

  await prisma.$queryRaw`ALTER TABLE jobs AUTO_INCREMENT = 1`;
  console.log('reset jobs auto increment to 1');

  await prisma.job.createMany({
    data: jobs,
  });
  console.log('Added jobs data');
}

module.exports = seed;
