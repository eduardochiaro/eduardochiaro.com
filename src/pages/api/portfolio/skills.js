import prisma from '../../../lib/prisma';
import corsMiddleware from '../../../middlewares/cors';

export default async function handler(req, res) {
  
  // run cors middleware
  await corsMiddleware(req, res);

  // Run api code
  const skills = await prisma.skill.findMany({
    where: {
      deletedAt: null
    }
  });
  res.status(200).json({ results: skills });
}