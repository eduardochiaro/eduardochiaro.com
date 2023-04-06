import type { NextApiRequest, NextApiResponse } from 'next';
import apiWithMiddleware from '@/utils/apiWithMiddleware';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import { File, IncomingForm } from 'formidable';
import fs from 'fs';
import { join } from 'path';
import moment from 'moment';

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
        const { id, company, name, description, startDate, endDate, tags, ...data } = fields as { [key: string]: string };
        const parsedTags = JSON.parse(tags);
        const newTags = parsedTags
          .filter((x: any) => x.new && !x.deleted && x.id == null)
          ?.map((x: any) => {
            return { name: x.name };
          });
        const appendTags = parsedTags
          .filter((x: any) => x.new && !x.deleted && x.id > 0)
          ?.map((x: any) => {
            return { id: x.id };
          });

        const dataMap = {
          name,
          company,
          description,
          startDate: startDate ? moment(startDate).toISOString() : null,
          endDate: endDate ? moment(endDate).toISOString() : null,
          updatedAt: new Date(),
          tags: {
            create: newTags,
            connect: appendTags,
          },
          image: '',
        };

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
          dataMap.image = newName;
        }

        const resume = await prisma.resume.create({
          data: dataMap,
          include: {
            tags: true,
            projects: true,
          },
        });
        res.status(200).json({ ...resume });
      });
    });
  } else {
    res.status(200).json({});
  }
};
export default apiWithMiddleware(handler);
