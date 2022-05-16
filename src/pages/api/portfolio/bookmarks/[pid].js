import apiWithMiddleware from '../../../../utils/apiWithMiddleware';
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
  const { pid } = req.query;

  const bookmarkReturn = await prisma.bookmark.findFirst({
    where: {
      id: parseInt(pid),
      deletedAt: null
    }
  });
  if (!bookmarkReturn) {
    res.status(200).json({ error: 'Record doesnt exist' });
  }
  switch (req.method) {
    case "PUT":
      await new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, async (err, fields) => {
          if (err) return reject(err)
          const { id, categoryId, ...data } = fields;
          const bookmark = await prisma.bookmark.update({
            where: { id: parseInt(id) },
            data: { ...data, categoryId: parseInt(categoryId), updatedAt: new Date() },
          });
          res.status(200).json({ ...bookmark });
        })
      });
      break;
    case "DELETE":
      await prisma.bookmark.update({
        where: { id: parseInt(pid) },
        data: { deletedAt: new Date() },
      });
      res.status(200).json({ action: 'bookmark deleted' });
      break;
    default:
      res.status(200).json({ ...bookmarkReturn });
      break;
  }

}
export default apiWithMiddleware(handler);