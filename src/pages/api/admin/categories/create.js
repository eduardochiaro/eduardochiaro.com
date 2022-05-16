import apiWithMiddleware from '../../../../utils/apiWithMiddlewareAdmin';
import prisma from '../../../../utils/prisma';
import cors from '../../../../middlewares/cors';
import { IncomingForm } from 'formidable'

export const config = {
  api: {
    bodyParser: false,
  }
};

const handler = async (req, res) => {
  await cors(req, res);
  if (req.method === 'POST') {
    await new Promise((resolve, reject) => {
      const form = new IncomingForm();
      form.parse(req, async (err, fields, files) => {
        if (err) return reject(err)
        const { id, ...data } = fields;
        const category = await prisma.category.create({
          data: { ...data, createdAt: new Date() },
        });
        res.status(200).json({ ...category });
      })
   })
  } else {
    res.status(200).json({});
  }
}
export default apiWithMiddleware(handler);