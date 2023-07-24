import type { NextApiRequest, NextApiResponse } from 'next';
import apiWithMiddleware from '@/utils/apiWithMiddleware';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import getFromForm, { FieldTypes } from "@/utils/getFromForm";

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
      const { fields: { percentage, name, type, logo } } = await getFromForm(req) as FieldTypes;
      const skill = await prisma.skill.update({
        where: { id: parseInt(pid) },
        data: { name, type, logo, percentage: parseInt(percentage), updatedAt: new Date() },
      });
      res.status(200).json({ ...skill });
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
