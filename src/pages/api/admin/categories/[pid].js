import apiWithMiddleware from '@/utils/apiWithMiddlewareAdmin';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import { IncomingForm } from 'formidable'

export const config = {
  api: {
    bodyParser: false,
  }
};

const handler = async (req, res) => {
  await cors(req, res);
  const { pid } = req.query;

  const categoryReturn = await prisma.category.findFirst({
    where: {
      id: parseInt(pid),
      deletedAt: null
    }
  });
  if (!categoryReturn) {
    res.status(200).json({ error: 'Record doesnt exist' });
  }
  switch (req.method) {
    case 'PUT':
      await new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, async (err, fields) => {
          if (err) return reject(err)
          const { id, ...data } = fields;
          const category = await prisma.category.update({
            where: { id: parseInt(id) },
            data: { ...data, updatedAt: new Date() },
          });
          res.status(200).json({ ...category });
        })
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

}
export default apiWithMiddleware(handler);