import { Metadata } from 'next';
import Card from '@/components/frontend/Card';
import BookSearch from '@/components/admin/BookSearch';
import { getBookTags, getBooks } from '@/actions/books';

export const metadata: Metadata = {
  title: 'Admin > Apps | Eduardo Chiaro',
};

export default async function AdminBooksIndex() {
  const books = await getBooks();
  const tags = await getBookTags();

  return (
    <div className={'p-6'}>
      <Card type="small" className="mb-10 flex justify-between gap-10">
        <h2 className="text-2xl font-semibold">Books</h2>
      </Card>
      <div className="mt-8 mb-2 flex flex-col items-start gap-4 px-6 md:flex-row md:items-center">
        <BookSearch books={books} tags={tags} />
      </div>
    </div>
  );
}
