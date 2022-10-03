const categoriesSeed = require('./categories.js');
const jobsSeed = require('./jobs.js');
const skillsSeed = require('./skills.js');
const menuSeed = require('./menu.js');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const load = async () => {
  try {
    await categoriesSeed();
    await jobsSeed();
    await skillsSeed();
    await menuSeed();
    
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
