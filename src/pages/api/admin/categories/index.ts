import type { NextApiRequest, NextApiResponse } from 'next';
import apiWithMiddleware from '@/utils/apiWithMiddlewareAdmin';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import type { Category } from '@prisma/client';

type Data = {
  results: Category[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);
  const categories = await prisma.category.findMany({
    include: {
      bookmarks: true,
    },
  });
  res.status(200).json({ results: categories });
};
export default apiWithMiddleware(handler);
