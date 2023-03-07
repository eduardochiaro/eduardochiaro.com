import type { NextApiRequest, NextApiResponse } from 'next';
import apiWithMiddleware from '@/utils/apiWithMiddleware';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import { File, IncomingForm } from 'formidable';
import fs from 'fs';
import { join } from 'path';

const uploadPath = './public/uploads/';

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
        const { name, description, url } = fields as { [key: string]: string };
        const app = await prisma.app.create({
          data: { name, description, url, image: newName, createdAt: new Date() },
        });
        res.status(200).json({ ...app });
      });
    });
  } else {
    res.status(200).json({});
  }
};
export default apiWithMiddleware(handler);
