import type { NextApiRequest, NextApiResponse } from 'next';
import apiWithMiddleware from '@/utils/apiWithMiddlewareAdmin';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import type { ResumeTag } from '@prisma/client';

type Data = {
  results: ResumeTag[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);
  const tags = await prisma.resumeTag.findMany({
    orderBy: {
      name: 'asc',
    },
    include: {
      jobs: {
        where: {
          deletedAt: null,
        },
      },
    },
  });
  res.status(200).json({ results: tags });
};
export default apiWithMiddleware(handler);