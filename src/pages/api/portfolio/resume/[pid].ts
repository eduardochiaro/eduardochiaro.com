import type { NextApiRequest, NextApiResponse } from 'next';
import apiWithMiddleware from '@/utils/apiWithMiddleware';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import { File, IncomingForm } from 'formidable';
import fs from 'fs';
import { rmFile } from 'rm-file';
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
  const { pid } = req.query as { pid: string };

  const resumeReturn = await prisma.resume.findFirst({
    where: {
      id: parseInt(pid),
      deletedAt: null,
    },
  });
  if (!resumeReturn) {
    res.status(200).json({ error: 'Record doesnt exist' });
  }
  switch (req.method) {
    case 'PUT':
      await new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, async (err, fields, files) => {
          if (err) return reject(err);
          const { id, company, name, description, startDate, endDate, tags } = fields as { [key: string]: string };
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
          const deletedTags = parsedTags
            .filter((x: any) => x.deleted && x.id > 0)
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
              disconnect: deletedTags,
            },
            image: resumeReturn?.image
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
            if (resumeReturn && resumeReturn.image) {
              await rmFile(`${uploadPath}${resumeReturn.image}`);
            }
            dataMap.image = newName;
          }

          const resume = await prisma.resume.update({
            where: { id: parseInt(id) },
            data: dataMap,
            include: {
              tags: true,
              projects: true,
            },
          });
          res.status(200).json({ ...resume });
        });
      });
      break;
    case 'DELETE':
      await prisma.resume.update({
        where: { id: parseInt(pid) },
        data: { deletedAt: new Date() },
      });
      if (resumeReturn && resumeReturn.image) {
        await rmFile(`${uploadPath}${resumeReturn.image}`);
      }
      res.status(200).json({ action: 'resume deleted' });
      break;
    default:
      res.status(200).json({ ...resumeReturn });
      break;
  }
};
export default apiWithMiddleware(handler);
