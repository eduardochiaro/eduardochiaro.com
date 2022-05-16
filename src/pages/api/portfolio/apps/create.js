import apiWithMiddleware from '../../../../utils/apiWithMiddleware';
import prisma from '../../../../utils/prisma';
import cors from '../../../../middlewares/cors';
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
        const oldPath = files.image.filepath;
        const extension = files.image.originalFilename.split(".").pop();
        const newName = files.image.newFilename + '.' + extension;
        const newPath = `${uploadPath}${newName}`;
        mv(oldPath, newPath, function(err) {
          console.error(err);
        });
        const { id, ...data } = fields;
        const app = await prisma.app.create({
          data: { ...data, image: newName, createdAt: new Date() },
        });
        res.status(200).json({ ...app });
      })
   })
  } else {
    res.status(200).json({});
  }
}
export default apiWithMiddleware(handler);