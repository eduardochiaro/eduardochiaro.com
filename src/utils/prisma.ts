declare global {
  var prisma: PrismaClient; // This must be a `var` and not a `let / const`
}

import { PrismaClient } from '@/utils/prismaClient';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({ log: ['error'] });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['info', 'query', 'warn', 'error'],
    });
  }
  prisma = global.prisma;
}

export default prisma;
