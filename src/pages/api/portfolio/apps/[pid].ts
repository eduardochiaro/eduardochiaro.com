import type { NextApiRequest, NextApiResponse } from 'next';
import apiWithMiddleware from '@/utils/apiWithMiddleware';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import { File, IncomingForm } from 'formidable';
import fs from 'fs';
import { rmFile } from 'rm-file';
import { join } from 'path';

const uploadPath = './public/uploads/';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  const { pid } = req.query as { pid: string };

  const appReturn = await prisma.app.findFirst({
    where: {
      id: parseInt(pid),
      deletedAt: null,
    },
  });
  if (!appReturn) {
    res.status(200).json({ error: 'Record doesnt exist' });
  }
  switch (req.method) {
    case 'PUT':
      await new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, async (err, fields, files) => {
          if (err) return reject(err);
          const { id, name, description, url } = fields as { [key: string]: string };
          if (files.image) {
            const file = files.image as File;
            const oldPath = file.filepath;
            const extension = file.originalFilename?.split('.').pop();
            const newName = file.newFilename + '.' + extension;

            try {
              // renames the file in the directory
              fs.renameSync(oldPath, join(uploadPath, newName));
            } catch (error) {
              console.log(error);
            }
            if (appReturn && appReturn.image) {
              await rmFile(`${uploadPath}${appReturn.image}`);
            }
            const app = await prisma.app.update({
              where: { id: parseInt(id) },
              data: { name, description, url, image: newName, updatedAt: new Date() },
            });
            res.status(200).json({ ...app });
          } else {
            const app = await prisma.app.update({
              where: { id: parseInt(id) },
              data: { name, description, url, updatedAt: new Date() },
            });
            res.status(200).json({ ...app });
          }
        });
      });
      break;
    case 'DELETE':
      await prisma.app.update({
        where: { id: parseInt(pid) },
        data: { deletedAt: new Date() },
      });
      if (appReturn && appReturn.image) {
        await rmFile(`${uploadPath}${appReturn.image}`);
      }
      res.status(200).json({ action: 'app deleted' });
      break;
    default:
      res.status(200).json({ ...appReturn });
      break;
  }
};
export default apiWithMiddleware(handler);
