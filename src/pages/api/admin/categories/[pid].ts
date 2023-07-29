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

  const categoryReturn = await prisma.category.findFirst({
    where: {
      id: parseInt(pid)
    },
  });
  if (!categoryReturn) {
    res.status(200).json({ error: 'Record doesnt exist' });
  }
  switch (req.method) {
    case 'PUT':
      await new Promise((_, reject) => {
        const form = new IncomingForm();
        form.parse(req, async (err, fields) => {
          if (err) return reject(err);
          const { name, type } = fields as { [key: string]: string };
          const category = await prisma.category.update({
            where: { id: parseInt(pid) },
            data: { name, type, updatedAt: new Date() },
          });
          res.status(200).json({ ...category });
        });
      });
      break;
    case 'DELETE':
      await prisma.category.update({
        where: { id: parseInt(pid) },
        data: { deletedAt: new Date() },
      });
      res.status(200).json({ action: 'category deleted' });
      break;
    default:
      res.status(200).json({ ...categoryReturn });
      break;
  }
};
export default apiWithMiddleware(handler);
