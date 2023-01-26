import apiWithMiddleware from '@/utils/apiWithMiddlewareAdmin';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';

const handler = async (req, res) => {
  await cors(req, res);
  const { search } = req.query;
  const tags = await prisma.resumeTag.findMany({
    where: {
      name: {
        contains: search
      }
    },
  });
  res.status(200).json({ results: tags });
};
export default apiWithMiddleware(handler);
