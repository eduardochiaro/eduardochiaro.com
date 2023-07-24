import type { NextApiRequest, NextApiResponse } from 'next';
import apiWithMiddleware from '@/utils/apiWithMiddleware';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import getFromForm, { FieldTypes } from "@/utils/getFromForm";
import type { MenuLink } from '@prisma/client';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  if (req.method === 'POST') {
    const { fields: { order, onlyMobile, active, name, url } } = await getFromForm(req) as FieldTypes;
    const menuLink: MenuLink = await prisma.menuLink.create({
      data: { name, url, order: parseInt(order || '0'), onlyMobile: onlyMobile == 'true', active: active == 'true', createdAt: new Date() },
    });
    res.status(200).json({ ...menuLink });
  } else {
    res.status(500).json({ error: 'failed to save data' });
  }
};
export default apiWithMiddleware(handler);
