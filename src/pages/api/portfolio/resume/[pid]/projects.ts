import type { NextApiRequest, NextApiResponse } from 'next';
import apiWithMiddleware from '@/utils/apiWithMiddleware';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import type { ResumeProject } from '@prisma/client';

type Data = {
  results: ResumeProject[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);
  const { pid } = req.query as { pid: string };
  const projects = await prisma.resumeProject.findMany({
    where: {
      deletedAt: null,
      resumeId: parseInt(pid)
    }
  });
  res.status(200).json({ results: projects });
};
export default apiWithMiddleware(handler);
