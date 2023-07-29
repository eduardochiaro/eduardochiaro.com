import type { NextApiRequest, NextApiResponse } from 'next';
import apiWithMiddleware from '@/utils/apiWithMiddleware';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import getFromForm, { FieldTypes } from '@/utils/getFromForm';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  const { pid } = req.query as { pid: string };

  const menuLinkReturn = await prisma.menuLink.findFirst({
    where: {
      id: parseInt(pid),
      deletedAt: null,
    },
  });
  if (!menuLinkReturn) {
    res.status(500).json({ error: 'Record doesnt exist' });
  }
  switch (req.method) {
    case 'PUT':
      const {
        fields: { order, onlyMobile, active, name, url },
      } = (await getFromForm(req)) as FieldTypes;
      const menuLink = await prisma.menuLink.update({
        where: { id: parseInt(pid) },
        data: { name, url, order: parseInt(order), onlyMobile: onlyMobile == 'true', active: active == 'true', updatedAt: new Date() },
      });
      res.status(200).json({ ...menuLink });
      break;
    case 'DELETE':
      await prisma.menuLink.update({
        where: { id: parseInt(pid) },
        data: { deletedAt: new Date() },
      });
      res.status(200).json({ action: 'menu link deleted' });
      break;
    default:
      res.status(500).json({ error: 'invalid method' });
      break;
  }
};
export default apiWithMiddleware(handler);
