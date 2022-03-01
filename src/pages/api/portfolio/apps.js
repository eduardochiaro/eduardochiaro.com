import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const apps = await prisma.app.findMany({
    where: {
      deletedAt: null
    }
  });
  res.status(200).json({ results: apps });
}