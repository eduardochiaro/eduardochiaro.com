import apiWithMiddleware from '../../../../lib/apiWithMiddleware';
import prisma from '../../../../lib/prisma';
import cors from '../../../../middlewares/cors';

const handler = async (req, res) => {
  await cors(req, res);
  const apps = await prisma.app.findMany({
    where: {
      deletedAt: null
    }
  });
  res.status(200).json({ results: apps });
}
export default apiWithMiddleware(handler);

