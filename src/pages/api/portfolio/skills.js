import apiWithMiddleware from '../../../lib/apiWithMiddleware';
import prisma from '../../../lib/prisma';

const handler = async (req, res) => {
  const skills = await prisma.skill.findMany({
    where: {
      deletedAt: null
    }
  });
  res.status(200).json({ results: skills });
}
export default apiWithMiddleware(handler);