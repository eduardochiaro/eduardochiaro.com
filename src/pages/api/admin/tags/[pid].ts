import type { NextApiRequest, NextApiResponse } from 'next';
import apiWithMiddleware from '@/utils/apiWithMiddlewareAdmin';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  const { pid } = req.query as { pid: string };

  const resumeTagReturn = await prisma.resumeTag.findFirst({
    where: {
      id: parseInt(pid),
    },
  });
  if (!resumeTagReturn) {
    res.status(200).json({ error: 'Record doesnt exist' });
  }
  switch (req.method) {
    case 'PUT':
      await new Promise((_, reject) => {
        const form = new IncomingForm();
        form.parse(req, async (err, fields) => {
          if (err) return reject(err);
          const { name } = fields as { [key: string]: string };
          const resumeTag = await prisma.resumeTag.update({
            where: { id: parseInt(pid) },
            data: { name },
          });
          res.status(200).json({ ...resumeTag });
        });
      });
      break;
    case 'DELETE':
      await prisma.resumeTag.delete({
        where: { id: parseInt(pid) },
      });
      res.status(200).json({ action: 'resume tag deleted' });
      break;
    default:
      res.status(200).json({ ...resumeTagReturn });
      break;
  }
};
export default apiWithMiddleware(handler);
