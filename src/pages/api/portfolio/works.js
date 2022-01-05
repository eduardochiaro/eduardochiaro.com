import { PrismaClient } from '@prisma/client';
import corsMiddleware from '../../../middlewares/cors';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  
  // run cors middleware
  await corsMiddleware(req, res);

  // Run api code
  const jobs = await prisma.job.findMany();
  res.status(200).json({ results: jobs });
}