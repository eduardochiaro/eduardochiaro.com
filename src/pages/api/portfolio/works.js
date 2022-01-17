import prisma from '../../../lib/prisma';
import corsMiddleware from '../../../middlewares/cors';

export default async function handler(req, res) {
  
  // run cors middleware
  await corsMiddleware(req, res);

  // Run api code
  const jobs = await prisma.job.findMany({
    where: {
      deletedAt: null
    }
  });
  res.status(200).json({ results: jobs });
}