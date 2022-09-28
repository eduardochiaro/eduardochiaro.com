import apiWithMiddleware from '@/utils/apiWithMiddleware';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  await cors(req, res);
  if (req.method === 'POST') {
    await new Promise((resolve, reject) => {
      const form = new IncomingForm();
      form.parse(req, async (err, fields, files) => {
        if (err) return reject(err);
        const { id, order, ...data } = fields;
        const menuLink = await prisma.menuLink.create({
          data: { ...data, order: parseInt(order || 0), createdAt: new Date() },
        });
        res.status(200).json({ ...menuLink });
      });
    });
  } else {
    res.status(200).json({});
  }
};
export default apiWithMiddleware(handler);
