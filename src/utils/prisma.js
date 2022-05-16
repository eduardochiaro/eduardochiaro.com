import { PrismaClient } from '@prisma/client'

let prisma

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({ log: ["error"] })
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ["info", "query", "warn", "error"],
    })
  }
  prisma = global.prisma
}

export default prisma