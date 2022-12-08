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
        const oldPath = files.logo.filepath;
        const extension = files.logo.originalFilename.split('.').pop();
        const newName = files.logo.newFilename + '.' + extension;
        const newPath = `${uploadPath}${newName}`;
        mv(oldPath, newPath, function (err) {
          console.error(err);
        });
        const { id, startDate, endDate, ...data } = fields;
        const job = await prisma.job.create({
          data: {
            ...data,
            startDate: startDate ? moment(startDate).toISOString() : null,
            endDate: endDate ? moment(endDate).toISOString() : null,
            logo: newName,
            createdAt: new Date(),
          },
        });
        res.status(200).json({ ...job });
      });
    });
  } else {
    res.status(200).json({});
  }
};
export default apiWithMiddleware(handler);
