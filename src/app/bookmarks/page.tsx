import BookmarksComponent from '@/components/frontend/Bookmarks';
import FrontendLayout from '@/components/layouts/Frontend';
import { Category, Bookmark } from '@prisma/client';
import { Metadata } from 'next';
import prisma from '@/utils/prisma';

interface BookmarkType extends Bookmark {
  domain?: string;
  category: Category;
}

export default async function Bookmarks() {
  const bookmarks = await getBookmarks();
  return (
    <FrontendLayout>
      <BookmarksComponent data={bookmarks} />
    </FrontendLayout>
  );
}

export const metadata: Metadata = {
  title: 'Bookmarks | Eduardo Chiaro',
};

async function getBookmarks() {
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
}
