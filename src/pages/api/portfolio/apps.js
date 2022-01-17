import prisma from '../../../lib/prisma';
import corsMiddleware from '../../../middlewares/cors';

export default async function handler(req, res) {
  
  // run cors middleware
  await corsMiddleware(req, res);

  // Run api code
  const apps = await prisma.app.findMany({
    where: {
      deletedAt: null
    }
  });
  res.status(200).json({ results: apps });
}