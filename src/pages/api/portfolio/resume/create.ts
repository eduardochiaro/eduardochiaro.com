import type { NextApiRequest, NextApiResponse } from 'next';
import apiWithMiddleware from '@/utils/apiWithMiddleware';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import getFromForm, { FieldTypes } from "@/utils/getFromForm";
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
    const { fields: { company, name, description, startDate, endDate, tags, ...data }, files: { image } } = await getFromForm(req) as FieldTypes;
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
      createdAt: new Date(),
      tags: {
        create: newTags,
        connect: appendTags,
      },
      image: '',
    };

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
  } else {
    res.status(200).json({});
  }
};
export default apiWithMiddleware(handler);
