import prisma from '../../../../lib/prisma';
import corsMiddleware from '../../../../middlewares/cors';

export default async function handler(req, res) {
  
  // run cors middleware
  await corsMiddleware(req, res);

  if (req.method === 'POST') {
    const { id, createdAt, ...data } = req.body;
    const job = await prisma.job.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
    res.status(200).json({ job });
  } else {
    res.status(200).json({});
  }
}