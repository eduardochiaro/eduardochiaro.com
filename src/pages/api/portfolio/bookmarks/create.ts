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
  if (req.method === 'POST') {
    await new Promise((resolve, reject) => {
      const form = new IncomingForm();
      form.parse(req, async (err, fields) => {
        if (err) return reject(err);
        const { id, categoryId, url, name, description } = fields as { [key: string]: string };
        const bookmark = await prisma.bookmark.create({
          data: { url, name, description, categoryId: parseInt(categoryId), createdAt: new Date() },
        });
        res.status(200).json({ ...bookmark });
      });
    });
  } else {
    res.status(200).json({});
  }
};
export default apiWithMiddleware(handler);
