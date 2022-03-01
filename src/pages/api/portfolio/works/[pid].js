import apiWithMiddleware from '../../../../lib/apiWithMiddleware';
import prisma from '../../../../lib/prisma';

const handler = async (req, res) => {
  const { pid } = req.query;

  if (req.method === 'POST') {
    const { id, ...data } = req.body;
    const job = await prisma.job.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
    res.status(200).json({ job });
  } else {
    const job = await prisma.job.findFirst({
      where: {
        id: parseInt(pid),
        deletedAt: null
      }
    });
    res.status(200).json({ ...job });
  }
}
export default apiWithMiddleware(handler);