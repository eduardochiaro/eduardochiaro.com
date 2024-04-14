import { Metadata } from 'next';
import prisma from '@/utils/prisma';
import { cache } from 'react';
import BookComponent from '@/components/frontend/Books';
import Footer from '@/components/frontend/Footer';
import Header from '@/components/frontend/Header';
import getMenuLinks from '@/utils/getMenuLinks';

import styles from '@/styles/Book.module.scss';

export default async function Bookmarks() {
  const books = await getBooks();
  const menuLinks = await getMenuLinks();
  return (
    <div className={`${styles.layout} flex min-h-screen flex-col justify-between`}>
      <Header data={menuLinks} />
      <div className={'flex grow flex-col bg-fixed'}>
        <div className={'mb-auto grow pb-10'}>
          <BookComponent data={books} />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Bookmarks | Eduardo Chiaro',
};

const getBooks = cache(() => {
  return prisma.book.findMany({
    include: {
      tags: {
        where: {
          published: true,
        },
      },
      file: true,
    },
    orderBy: {
      title: 'desc',
    },
  });
});
