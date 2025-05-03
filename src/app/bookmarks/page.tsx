import BookmarksComponent from '@/components/frontend/Bookmarks';
import FrontendLayout from '@/components/layouts/Frontend';
import { Category, Bookmark } from '@prisma/client';
import { Metadata } from 'next';
import prisma from '@/utils/prisma';
import { cache } from 'react';

interface BookmarkType extends Bookmark {
  domain?: string;
  category: Category;
}

export default async function Bookmarks() {
  const bookmarks = await getBookmarks();
  return (
    <FrontendLayout>
      <div className="flex">
        <section id="work" className={'mx-auto mt-10 max-w-5xl grow px-4 lg:px-0'}>
          <h1 className="font-header text-3xl leading-tight font-light tracking-wide lg:text-4xl">Bookmarks</h1>
          <BookmarksComponent data={bookmarks} />
        </section>
      </div>
    </FrontendLayout>
  );
}

export const metadata: Metadata = {
  title: 'Bookmarks | Eduardo Chiaro',
};

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
