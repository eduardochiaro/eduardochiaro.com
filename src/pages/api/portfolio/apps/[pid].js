import apiWithMiddleware from '../../../../lib/apiWithMiddleware';
import prisma from '../../../../lib/prisma';
import cors from '../../../../lib/cors';
import { IncomingForm } from 'formidable'
import mv from 'mv';
import { rmFile } from 'rm-file';

const uploadPath = "./public/uploads/"

export const config = {
  api: {
     bodyParser: false,
  }
};

const handler = async (req, res) => {
  await cors(req, res);
  const { pid } = req.query;

  const appReturn = await prisma.app.findFirst({
    where: {
      id: parseInt(pid),
      deletedAt: null
    }
  });
  if (!appReturn) {
    res.status(200).json({ error: 'Record doesnt exist' });
  }
  switch (req.method) {
    case "POST":
      await new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, async (err, fields, files) => {
          if (err) return reject(err)
          const { id, style, ...data } = fields;
          if (files.image) {
            const oldPath = files.image.filepath;
            const extension = files.image.originalFilename.split(".").pop();
            const newName = files.image.newFilename + '.' + extension;
            const newPath = `${uploadPath}${newName}`;
            mv(oldPath, newPath, function(err) {
              console.error(err);
            });
            await rmFile(`${uploadPath}${appReturn.image}`);
            const app = await prisma.app.update({
              where: { id: parseInt(id)  },
              data: { ...data, image: newName, updatedAt: new Date() },
            });
            res.status(200).json({ ...app });
          } else { 
            const app = await prisma.app.update({
              where: { id: parseInt(id) },
              data: { ...data, updatedAt: new Date() },
            });
            res.status(200).json({ ...app });
          }
        })
      });
      break;
    case "DELETE":
      await prisma.app.delete({
        where: { id: parseInt(pid) },
      });
      await rmFile(`${uploadPath}${appReturn.image}`);
      res.status(200).json({ action: 'app deleted' });
      break;
    default:
      res.status(200).json({ ...appReturn });
      break;
  }

}
export default apiWithMiddleware(handler);