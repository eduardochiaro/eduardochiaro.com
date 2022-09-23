import apiWithMiddleware from '@/utils/apiWithMiddleware';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import { IncomingForm } from 'formidable';
import mv from 'mv';
import { rmFile } from 'rm-file';

const uploadPath = './public/uploads/';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  await cors(req, res);
  const { pid } = req.query;

  const jobReturn = await prisma.job.findFirst({
    where: {
      id: parseInt(pid),
      deletedAt: null,
    },
  });
  if (!jobReturn) {
    res.status(200).json({ error: 'Record doesnt exist' });
  }
  switch (req.method) {
    case 'PUT':
      await new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, async (err, fields, files) => {
          if (err) return reject(err);
          const { id, style, ...data } = fields;
          if (files.logo) {
            const oldPath = files.logo.filepath;
            const extension = files.logo.originalFilename.split('.').pop();
            const newName = files.logo.newFilename + '.' + extension;
            const newPath = `${uploadPath}${newName}`;
            mv(oldPath, newPath, function (err) {
              console.error(err);
            });
            await rmFile(`${uploadPath}${jobReturn.logo}`);
            const job = await prisma.job.update({
              where: { id: parseInt(id) },
              data: { ...data, style: parseInt(style), logo: newName, updatedAt: new Date() },
            });
            res.status(200).json({ ...job });
          } else {
            const job = await prisma.job.update({
              where: { id: parseInt(id) },
              data: { ...data, style: parseInt(style), updatedAt: new Date() },
            });
            res.status(200).json({ ...job });
          }
        });
      });
      break;
    case 'DELETE':
      await prisma.job.update({
        where: { id: parseInt(pid) },
        data: { deletedAt: new Date() },
      });
      await rmFile(`${uploadPath}${jobReturn.logo}`);
      res.status(200).json({ action: 'job deleted' });
      break;
    default:
      res.status(200).json({ ...jobReturn });
      break;
  }
};
export default apiWithMiddleware(handler);
