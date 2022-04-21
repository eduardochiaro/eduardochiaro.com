import apiWithMiddleware from '../../../../lib/apiWithMiddleware';
import prisma from '../../../../lib/prisma';
import cors from '../../../../lib/cors';
import { URL } from 'url';

const handler = async (req, res) => {
  await cors(req, res);
  const bookmarks = await prisma.bookmark.findMany({
    where: {
      deletedAt: null
    }
  });
  bookmarks.map(bookmark => {
    const myURL = new URL(bookmark.url);
    bookmark.domain = myURL.hostname;
    return bookmark;
  });
  res.status(200).json({ results: bookmarks });
}
export default apiWithMiddleware(handler);

