import type { NextApiRequest, NextApiResponse } from 'next';
import apiWithMiddleware from '@/utils/apiWithMiddleware';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import { rmFile } from 'rm-file';

const uploadPath = './public/uploads/';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  const { pid } = req.query as { pid: string };

  const projectReturn = await prisma.resumeProject.findFirst({
    where: {
      id: parseInt(pid)
    },
  });
  if (!projectReturn) {
    res.status(200).json({ error: 'Record doesnt exist' });
  }
  switch (req.method) {
    case 'DELETE':
      await prisma.resumeProject.delete({
        where: { id: parseInt(pid) }
      });
      if (projectReturn && projectReturn.image) {
        await rmFile(`${uploadPath}${projectReturn.image}`);
      }
      res.status(200).json({ action: 'resume project deleted' });
      break;
    default:
      res.status(200).json({ ...projectReturn });
      break;
  }
};
export default apiWithMiddleware(handler);
