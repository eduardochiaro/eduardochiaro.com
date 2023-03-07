import type { NextApiRequest, NextApiResponse } from 'next';
import apiWithMiddleware from '@/utils/apiWithMiddleware';
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

  const skillReturn = await prisma.skill.findFirst({
    where: {
      id: parseInt(pid),
      deletedAt: null,
    },
  });
  if (!skillReturn) {
    res.status(200).json({ error: 'Record doesnt exist' });
  }
  switch (req.method) {
    case 'PUT':
      await new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, async (err, fields) => {
          if (err) return reject(err);
          const { id, percentage, name, type, logo } = fields as { [key: string]: string };
          const skill = await prisma.skill.update({
            where: { id: parseInt(id) },
            data: { name, type, logo, percentage: parseInt(percentage), updatedAt: new Date() },
          });
          res.status(200).json({ ...skill });
        });
      });
      break;
    case 'DELETE':
      await prisma.skill.update({
        where: { id: parseInt(pid) },
        data: { deletedAt: new Date() },
      });
      res.status(200).json({ action: 'skill deleted' });
      break;
    default:
      res.status(200).json({ ...skillReturn });
      break;
  }
};
export default apiWithMiddleware(handler);