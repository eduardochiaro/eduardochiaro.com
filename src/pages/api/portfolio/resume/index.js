import apiWithMiddleware from '@/utils/apiWithMiddleware';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';

const handler = async (req, res) => {
  await cors(req, res);
  const jobs = await prisma.resume.findMany({
    where: {
      deletedAt: null,
    },
    orderBy: {
      startDate: 'desc',
    },
    include: {
      tags: true,
      projects: true,
    },
  });
  res.status(200).json({ results: jobs });
};
export default apiWithMiddleware(handler);
