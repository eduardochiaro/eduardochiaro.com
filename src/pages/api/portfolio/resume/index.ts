import type { NextApiRequest, NextApiResponse } from 'next';
import apiWithMiddleware from '@/utils/apiWithMiddleware';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import type { Resume } from "@prisma/client";

type Data = {
  results: Resume[];
};

const handler = async (req:NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);
  const jobs = await prisma.resume.findMany({
    where: {
      deletedAt: null,
    },
    orderBy: {
      startDate: 'desc',
    },
    include: {
      tags: true,
      projects: true,
    },
  });
  res.status(200).json({ results: jobs });
};
export default apiWithMiddleware(handler);
