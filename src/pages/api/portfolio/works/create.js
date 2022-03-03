import apiWithMiddleware from '../../../../lib/apiWithMiddleware';
import prisma from '../../../../lib/prisma';
import cors from '../../../../lib/cors';
import { IncomingForm } from 'formidable'
import mv from 'mv';

export const config = {
  api: {
     bodyParser: false,
  }
};

const handler = async (req, res) => {
  await cors(req, res);
  if (req.method === 'POST') {

    await new Promise((resolve, reject) => {
      const form = new IncomingForm();
      form.parse(req, async (err, fields, files) => {
        if (err) return reject(err)
        var oldPath = files.logo.filepath;
        var newPath = `./public/images/logos/${files.logo.originalFilename}`;
        mv(oldPath, newPath, function(err) {
          console.error(err);
        });
        const { id, style, ...data } = fields;
        const job = await prisma.job.create({
          data: { ...data, style: parseInt(style || 0), logo: files.logo.originalFilename, special: false, createdAt: new Date() },
        });
        res.status(200).json({ ...job });
      })
   })
    /*
    const job = await prisma.job.create({
      data: { ...data, style: parseInt(style || 0), special: false, createdAt: new Date() },
    });
    res.status(200).json({ job });
    */
  } else {
    res.status(200).json({});
  }
}
export default apiWithMiddleware(handler);