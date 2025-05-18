const categoriesSeed = require('./categories.js');
const skillsSeed = require('./skills.js');
const menuSeed = require('./menu.js');
const appsSeed = require('./apps.js');
const resumeSeed = require('./resume.js');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const load = async () => {
  try {
    await categoriesSeed();
    await skillsSeed();
    await menuSeed();
    await appsSeed();
    await resumeSeed();
    
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
