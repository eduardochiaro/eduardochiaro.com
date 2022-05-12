import apiWithMiddleware from '../../../../lib/apiWithMiddleware';
import prisma from '../../../../lib/prisma';
import cors from '../../../../middlewares/cors';

const handler = async (req, res) => {
  await cors(req, res);
  const skills = await prisma.skill.findMany({
    where: {
      deletedAt: null
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  res.status(200).json({ results: skills });
}
export default apiWithMiddleware(handler);

