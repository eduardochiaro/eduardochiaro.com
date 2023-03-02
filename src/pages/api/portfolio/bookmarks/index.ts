import type { NextApiRequest, NextApiResponse } from 'next';
import apiWithMiddleware from '@/utils/apiWithMiddleware';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import { URL } from 'url';
import type { Bookmark } from "@prisma/client";

interface BookmarkType extends Bookmark {
  domain?: string;
} ;

type Data = {
  results: BookmarkType[];
};

const handler = async (req:NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);
  const bookmarks: BookmarkType[] = await prisma.bookmark.findMany({
    where: {
      deletedAt: null,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  bookmarks.map((bookmark) => {
    const myURL = new URL(bookmark.url);
    bookmark.domain = myURL.hostname;
    return bookmark;
  });
  res.status(200).json({ results: bookmarks });
};
export default apiWithMiddleware(handler);
