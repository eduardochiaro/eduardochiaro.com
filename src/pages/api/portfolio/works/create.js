import apiWithMiddleware from '../../../../lib/apiWithMiddleware';
import prisma from '../../../../lib/prisma';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { id, style, ...data } = req.body;
    const job = await prisma.job.create({
      data: { ...data, style: parseInt(style || 0), special: false, createdAt: new Date() },
    });
    res.status(200).json({ job });
  } else {
    res.status(200).json({});
  }
}
export default apiWithMiddleware(handler);