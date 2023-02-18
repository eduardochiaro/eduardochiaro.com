import apiWithMiddleware from '@/utils/apiWithMiddleware';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import { IncomingForm } from 'formidable';
import mv from 'mv';
import { rmFile } from 'rm-file';
import moment from 'moment';

const uploadPath = './public/uploads/';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  await cors(req, res);
  const { pid } = req.query;

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
          const { id, company, name, description, startDate, endDate, tags, ...data } = fields;
          const parsedTags = JSON.parse(tags);
          const newTags = parsedTags.filter(x => x.new && !x.deleted && x.id == null)?.map(x => { return { name: x.name }});
          const appendTags = parsedTags.filter(x => x.new && !x.deleted && x.id > 0)?.map(x => { return { id: x.id }});
          const deletedTags = parsedTags.filter(x => x.deleted && x.id > 0)?.map(x => { return { id: x.id }});

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
              disconnect: deletedTags
            }
          }
          //console.log(dataMap);
          //return reject();
          if (files.logo) {
            const oldPath = files.logo.filepath;
            const extension = files.logo.originalFilename.split('.').pop();
            const newName = files.logo.newFilename + '.' + extension;
            const newPath = `${uploadPath}${newName}`;
            mv(oldPath, newPath, function (err) {
              console.error(err);
            });
            await rmFile(`${uploadPath}${resumeReturn.logo}`);
            dataMap.logo = newName;
          }

          const resume = await prisma.resume.update({
            where: { id: parseInt(id) },
            data: dataMap,
            include: {
              tags: true,
              projects: true
            }
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
      await rmFile(`${uploadPath}${resumeReturn.logo}`);
      res.status(200).json({ action: 'resume deleted' });
      break;
    default:
      res.status(200).json({ ...resumeReturn });
      break;
  }
};
export default apiWithMiddleware(handler);
