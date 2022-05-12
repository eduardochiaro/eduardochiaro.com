import apiWithMiddleware from '../../../../lib/apiWithMiddleware';
import prisma from '../../../../lib/prisma';
import cors from '../../../../middlewares/cors';

const handler = async (req, res) => {
  await cors(req, res);
  const jobs = await prisma.job.findMany({
    where: {
      deletedAt: null
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  res.status(200).json({ results: jobs });
}
export default apiWithMiddleware(handler);

