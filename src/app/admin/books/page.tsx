import moment from 'moment';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { Metadata } from 'next';
import authOptions from '@/config/nextAuth';
import AdminPage from '@/components/admin/Page';
import prisma from '@/utils/prisma';
import BackendLayout from '@/components/layouts/Backend';
import BookSearch from '@/components/admin/BookSearch';

export const metadata: Metadata = {
  title: 'Admin > Apps | Eduardo Chiaro',
};

export default async function AdminBooksIndex() {
  const session = await getServerSession(authOptions);
  const books = await getBooks();

  const title = 'Books';
  const single = 'book';

  if (session) {
    return (
      <BackendLayout isPageOpen={false}>
        <div className={'h-full grow'}>
          <div className="h-screen overflow-auto bg-primary-100 py-8 dark:bg-primary-800">
            <div className="flex items-center gap-6 px-6 text-3xl">
              <h1 className="grow font-semibold md:flex-grow-0">{title}</h1>
            </div>
            <div className="mb-2 mt-8 flex flex-col items-start gap-4 px-6 md:flex-row md:items-center">
              <BookSearch />
            </div>
          </div>
        </div>
      </BackendLayout>
    );
  }
  return null;
}

async function getBooks() {
  return prisma.book.findMany({
    orderBy: {
      title: 'asc',
    },
  });
}
