import apiWithMiddleware from '../../../../lib/apiWithMiddleware';
import prisma from '../../../../lib/prisma';
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
        const { id, categoryId, ...data } = fields;
        const bookmark = await prisma.bookmark.create({
          data: { ...data, categoryId: parseInt(categoryId), createdAt: new Date() },
        });
        res.status(200).json({ ...bookmark });
      })
   })
  } else {
    res.status(200).json({});
  }
}
export default apiWithMiddleware(handler);