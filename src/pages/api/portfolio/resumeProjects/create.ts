import type { NextApiRequest, NextApiResponse } from 'next';
import apiWithMiddleware from '@/utils/apiWithMiddleware';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import { IncomingForm } from 'formidable';
import uploadFile from '@/utils/uploadFile';

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
        const { name, resumeId } = fields as { [key: string]: string };
    
        const dataMap = {
          name,
          resumeId: parseInt(resumeId),
          createdAt: new Date(),
          image: '',
        };

        const uploadedFile = uploadFile(files, 'image', uploadPath);
        if (uploadedFile) {
          dataMap.image = uploadedFile;
        }

        const resume = await prisma.resumeProject.create({
          data: dataMap
        });
        res.status(200).json({ ...resume });
      });
    });
  } else {
    res.status(200).json({});
  }
};
export default apiWithMiddleware(handler);
