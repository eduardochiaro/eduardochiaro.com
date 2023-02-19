import apiWithMiddleware from '@/utils/apiWithMiddleware';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import { IncomingForm } from 'formidable';
import mv from 'mv';
import moment from 'moment';

const uploadPath = './public/uploads/';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  await cors(req, res);
  if (req.method === 'POST') {
    await new Promise((resolve, reject) => {
      const form = new IncomingForm();
      form.parse(req, async (err, fields, files) => {
        if (err) return reject(err);
        const { id, company, name, description, startDate, endDate, tags, ...data } = fields;
        const parsedTags = JSON.parse(tags);
        const newTags = parsedTags
          .filter((x) => x.new && !x.deleted && x.id == null)
          ?.map((x) => {
            return { name: x.name };
          });
        const appendTags = parsedTags
          .filter((x) => x.new && !x.deleted && x.id > 0)
          ?.map((x) => {
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
        };

        if (files.logo) {
          const oldPath = files.logo.filepath;
          const extension = files.logo.originalFilename.split('.').pop();
          const newName = files.logo.newFilename + '.' + extension;
          const newPath = `${uploadPath}${newName}`;
          mv(oldPath, newPath, function (err) {
            console.error(err);
          });
          dataMap.logo = newName;
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
