import type { NextApiRequest, NextApiResponse } from 'next';
import apiWithMiddleware from '@/utils/apiWithMiddleware';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import type { Skill } from "@prisma/client";

type Data = {
  results: Skill[];
};

const handler = async (req:NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);
  const skills = await prisma.skill.findMany({
    where: {
      deletedAt: null,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  res.status(200).json({ results: skills });
};
export default apiWithMiddleware(handler);
