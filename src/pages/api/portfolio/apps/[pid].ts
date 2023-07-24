import type { NextApiRequest, NextApiResponse } from 'next';
import apiWithMiddleware from '@/utils/apiWithMiddleware';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import getFromForm, { FieldTypes } from "@/utils/getFromForm";
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
      const { fields: { name, description, url }, files: { image } } = await getFromForm(req) as FieldTypes;
      if (image) {

        const oldPath = image.filepath;
        const extension = image.originalFilename?.split('.').pop();
        const newName = image.newFilename + '.' + extension;

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
          where: { id: parseInt(pid) },
          data: { name, description, url, image: newName, updatedAt: new Date() },
        });
        res.status(200).json({ ...app });
      } else {
        const app = await prisma.app.update({
          where: { id: parseInt(pid) },
          data: { name, description, url, updatedAt: new Date() },
        });
        res.status(200).json({ ...app });
      }

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
