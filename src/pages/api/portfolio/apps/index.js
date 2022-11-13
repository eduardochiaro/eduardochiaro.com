import apiWithMiddleware from '@/utils/apiWithMiddleware';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';

const handler = async (req, res) => {
  await cors(req, res);
  const apps = await prisma.app.findMany({
    where: {
      deletedAt: null,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  res.status(200).json({ results: apps });
};
export default apiWithMiddleware(handler);
