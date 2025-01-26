import { Metadata } from 'next';
import BackendLayout from '@/components/layouts/Backend';
import BookSearch from '@/components/admin/BookSearch';
import { getBookTags, getBooks } from '@/actions/books';

export const metadata: Metadata = {
  title: 'Admin > Apps | Eduardo Chiaro',
};

export default async function AdminBooksIndex() {
  const books = await getBooks();
  const tags = await getBookTags();

  const title = 'Books';
  const single = 'book';

  return (
    <BackendLayout isPageOpen={false}>
      <div className={'h-full grow'}>
        <div className="bg-primary-100 dark:bg-primary-800 h-screen overflow-auto py-8">
          <div className="flex items-center gap-6 px-6 text-3xl">
            <h1 className="grow font-semibold md:flex-grow-0">{title}</h1>
          </div>
          <div className="mt-8 mb-2 flex flex-col items-start gap-4 px-6 md:flex-row md:items-center">
            <BookSearch books={books} tags={tags} />
          </div>
        </div>
      </div>
    </BackendLayout>
  );
}
