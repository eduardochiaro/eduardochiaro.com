import apiWithMiddleware from '@/utils/apiWithMiddlewareAdmin';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';

const handler = async (req, res) => {
  await cors(req, res);
  const categories = await prisma.category.findMany({
    where: {
      deletedAt: null,
    },
    include: {
      bookmarks: true
    },
  });
  res.status(200).json({ results: categories });
};
export default apiWithMiddleware(handler);
