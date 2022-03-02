import apiWithMiddleware from '../../../../lib/apiWithMiddleware';
import prisma from '../../../../lib/prisma';
import cors from '../../../../lib/cors';

const handler = async (req, res) => {
  await cors(req, res);
  const { pid } = req.query;

  switch (req.method) {
    case "POST":
      const { id, logo, ...data } = req.body;
      console.log(logo); res.status(200).json({});
      /*
      const job = await prisma.job.update({
        where: { id },
        data: { ...data, updatedAt: new Date() },
      });
      res.status(200).json({ job });
      */
      break;
    case "DELETE":
      await prisma.job.delete({
        where: { id: parseInt(pid) },
      });
      res.status(200).json({ action: 'job deleted' });
      break;
    default:
      const jobReturn = await prisma.job.findFirst({
        where: {
          id: parseInt(pid),
          deletedAt: null
        }
      });
      res.status(200).json({ ...jobReturn });
      break;
  }

}
export default apiWithMiddleware(handler);