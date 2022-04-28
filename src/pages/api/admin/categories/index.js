import apiWithMiddleware from '../../../../lib/apiWithMiddlewareAdmin';
import prisma from '../../../../lib/prisma';
import cors from '../../../../middlewares/cors';

const handler = async (req, res) => {
  await cors(req, res);
  const categories = await prisma.category.findMany({
    where: {
      deletedAt: null
    }
  });
  res.status(200).json({ results: categories });
}
export default apiWithMiddleware(handler);

