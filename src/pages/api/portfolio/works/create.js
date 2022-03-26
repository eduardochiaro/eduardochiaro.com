import apiWithMiddleware from '../../../../lib/apiWithMiddleware';
import prisma from '../../../../lib/prisma';
import cors from '../../../../lib/cors';
import { IncomingForm } from 'formidable'
import mv from 'mv';

const uploadPath = "./public/uploads/";

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
        const oldPath = files.logo.filepath;
        const extension = files.logo.originalFilename.split(".").pop();
        const newName = files.logo.newFilename + '.' + extension;
        const newPath = `${uploadPath}${newName}`;
        mv(oldPath, newPath, function(err) {
          console.error(err);
        });
        const { id, style, ...data } = fields;
        const job = await prisma.job.create({
          data: { ...data, style: parseInt(style || 0), logo: newName, special: false, createdAt: new Date() },
        });
        res.status(200).json({ ...job });
      })
   })
  } else {
    res.status(200).json({});
  }
}
export default apiWithMiddleware(handler);