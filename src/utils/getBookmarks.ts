import { cache } from 'react';
import prisma from '@/utils/prisma';
import { Category, Bookmark } from '@prisma/client';

export const revalidate = 60 // revalidate the data at most every hour
 
interface BookmarkType extends Bookmark {
  domain?: string;
  category: Category;
}

const getBookmarks = cache(async () => {

  const bookmarks: BookmarkType[] = await prisma.bookmark.findMany({
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
  return bookmarks;
});


export default getBookmarks;