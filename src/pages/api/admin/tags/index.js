import apiWithMiddleware from '@/utils/apiWithMiddlewareAdmin';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';

const handler = async (req, res) => {
  await cors(req, res);
  const tags = await prisma.resumeTag.findMany({
    orderBy: {
      name: 'asc',
    },
    include: {
      jobs: {
        where: {
          deletedAt: null,
        }
      }
    },
  });
  res.status(200).json({ results: tags });
};
export default apiWithMiddleware(handler);
