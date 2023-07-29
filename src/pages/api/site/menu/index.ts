import type { NextApiRequest, NextApiResponse } from 'next';
import apiWithMiddleware from '@/utils/apiWithMiddleware';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import type { MenuLink } from '@prisma/client';

type Data = {
  results: MenuLink[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);
  const menuLinks = await prisma.menuLink.findMany({
    orderBy: {
      order: 'asc',
    },
  });
  res.status(200).json({ results: menuLinks });
};
export default apiWithMiddleware(handler);
