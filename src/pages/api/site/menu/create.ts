import type { NextApiRequest, NextApiResponse } from 'next';
import apiWithMiddleware from '@/utils/apiWithMiddleware';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import { IncomingForm } from 'formidable';
import type { MenuLink } from '@prisma/client';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  if (req.method === 'POST') {
    await new Promise((resolve, reject) => {
      const form = new IncomingForm();
      form.parse(req, async (err, fields, files) => {
        if (err) return reject(err);
        const { id, order, onlyMobile, active, ...data } = fields as { [key: string]: string };
        const menuLink: MenuLink = await prisma.menuLink.create({
          data: { ...data, order: parseInt(order || '0'), onlyMobile: onlyMobile == 'true', active: active == 'true', createdAt: new Date() },
        });
        res.status(200).json({ ...menuLink });
      });
    });
  } else {
    res.status(500).json({ error: 'failed to save data' });
  }
};
export default apiWithMiddleware(handler);
