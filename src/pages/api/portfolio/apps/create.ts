import type { NextApiRequest, NextApiResponse } from 'next';
import apiWithMiddleware from '@/utils/apiWithMiddleware';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import getFromForm, { FieldTypes } from "@/utils/getFromForm";
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
    const { fields: { name, description, url }, files: { image } } = await getFromForm(req) as FieldTypes;

    const oldPath = image.filepath;
    const extension = image.originalFilename?.split('.').pop();
    const newName = image.newFilename + '.' + extension;

    try {
      // renames the file in the directory
      fs.renameSync(oldPath, join(uploadPath, newName));
    } catch (error) {
      console.log(error);
    }

    const app = await prisma.app.create({
      data: { name, description, url, image: newName, createdAt: new Date() },
    });
    res.status(200).json({ ...app });
  } else {
    res.status(200).json({});
  }
};
export default apiWithMiddleware(handler);
