import apiWithMiddleware from '../../../../lib/apiWithMiddleware';
import prisma from '../../../../lib/prisma';
import cors from '../../../../lib/cors';
import { IncomingForm } from 'formidable'

export const config = {
  api: {
     bodyParser: false,
  }
};

const handler = async (req, res) => {
  await cors(req, res);
  const { pid } = req.query;

  const skillReturn = await prisma.skill.findFirst({
    where: {
      id: parseInt(pid),
      deletedAt: null
    }
  });
  if (!skillReturn) {
    res.status(200).json({ error: 'Record doesnt exist' });
  }
  switch (req.method) {
    case "POST":
      await new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, async (err, fields, files) => {
          if (err) return reject(err)
          const { id, percentage, ...data } = fields;
          const skill = await prisma.skill.update({
            where: { id: parseInt(id) },
            data: { ...data, percentage: parseInt(percentage), updatedAt: new Date() },
          });
          res.status(200).json({ ...skill });
        })
      });
      break;
    case "DELETE":
      await prisma.skill.update({
        where: { id: parseInt(pid) },
        data: { deletedAt: new Date() },
      });
      res.status(200).json({ action: 'skill deleted' });
      break;
    default:
      res.status(200).json({ ...skillReturn });
      break;
  }

}
export default apiWithMiddleware(handler);