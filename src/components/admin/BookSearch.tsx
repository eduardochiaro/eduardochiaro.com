'use client';

import { useReducer, useState } from 'react';
import { Input } from '../form';
import SpinnerIcon from '@/components/icons/Spinner';
import { addBook, deleteBook, getBooks } from '@/actions/books';
import { Book, Prisma } from '@prisma/client';
import classNames from '@/utils/classNames';

type BookExpanded = Prisma.BookGetPayload<{ include: { file: true } }>;

export default function BookSearch({ books }: { books: BookExpanded[] }) {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<BookExpanded[]>(books);

  const responseData = {
    numFound: 0,
    start: 0,
    offset: 0,
    results: [],
  };

  const [data, updateData] = useReducer((x: any, y: any) => {
    return { ...x, ...y };
  }, responseData);

  const checkIfBookIsSaved = (book: BookExpanded) => {
    return results.some((b) => b.isbn === book.isbn);
  };

  const handleSearch = () => {
    //fetch data from https://openlibrary.org/search.json
    setIsLoading(true);

    const response = fetch(`https://openlibrary.org/search.json?q=${search}&fields=title,author_name,cover_i,isbn&limit=100&offset=0`)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        updateData({
          numFound: data.numFound,
          start: data.start,
          offset: data.offset,
          results: data.docs.map((book: any) => {
            return {
              title: book.title,
              author: book.author_name ? book.author_name[0] : 'Unknown author',
              file: {
                path: book.cover_i ? 'https://covers.openlibrary.org/b/id/' + book.cover_i + '-M.jpg' : null,
              },
              isbn: book.isbn ? book.isbn[0] : '',
            };
          }),
        });
      })
      .catch((error) => console.error(error));
  };

  const addBookAction = async (book: BookExpanded) => {
    await addBook(book);
    const books = await getBooks();
    setResults(books);
  };

  const deleteBookAction = async (book: BookExpanded) => {
    await deleteBook(book);
    const books = await getBooks();
    setResults(books);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <Input
          label="Search"
          name="search"
          type="text"
          placeholder="Search book by name or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <button className="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {isLoading && (
        <p className="mt-10 flex items-center gap-2">
          <SpinnerIcon className="h-5 animate-spin" /> Loading...
        </p>
      )}
      {!isLoading && data.numFound > 0 && (
        <div className="mt-10">
          <div className="relative flex">
            <label className="flex items-center gap-2">
              <span className="text-gray-500 text-sm font-semibold">Results:</span>
              <span className="text-gray-800 text-sm">
                {data.numFound} (show {data.numFound < 100 ? data.numFound : 100})
              </span>
            </label>
          </div>
          <div className="mt-10 max-w-screen-lg overflow-auto" role="menu" aria-orientation="horizontal" aria-labelledby="menu-button">
            <div className="flex items-start gap-8 pb-4">
              {data.results.map((book: BookExpanded, index: number) => (
                <div key={index} className="flex w-44 flex-col">
                  <p className="text-gray-500 mb-1 line-clamp-2 text-center text-sm" title={book.author || ''}>
                    {book.author}
                  </p>

                  <div
                    className={classNames(
                      book.file && book.file.path ? 'bg-emerald-600' : 'bg-accent-600',
                      'relative mx-auto flex h-60 w-40 flex-col overflow-hidden rounded-l-md border border-primary-700 bg-cover bg-center bg-no-repeat drop-shadow-md',
                    )}
                    style={{
                      backgroundImage: book.file?.path ? `url('${book.file.path}')` : '',
                      backgroundPosition: 'top center',
                    }}
                    title={book.title}
                  >
                    <div className="absolute left-1 top-0 h-60 w-1 border-r-2 border-primary-950 bg-secondary-900 opacity-30" />
                    {(!book.file || !book.file.path) && (
                      <>
                        <h3 className="mt-5 line-clamp-5 grow px-3 text-center text-base font-semibold">{book.title}</h3>
                        <p className="text-gray-500 mb-2 line-clamp-3 px-3 text-center text-xs">{book.author}</p>
                      </>
                    )}
                  </div>
                  <h3 className="mt-2 line-clamp-2 text-center text-base font-semibold" title={book.title}>
                    {book.title}
                  </h3>
                  <p className="text-gray-500 mb-1 line-clamp-2 text-center text-sm" title={book.isbn || ''}>
                    {book.isbn}
                  </p>
                  {!checkIfBookIsSaved(book) && (
                    <button className="button mt-2" onClick={() => addBookAction(book)}>
                      Add
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {results.length > 0 && (
        <div className="mt-10">
          <h3 className="my-4 text-xl font-semibold">Saved Books</h3>
          <div className="grid grid-cols-4 items-end gap-6">
            {results.map((book: BookExpanded, index: number) => (
              <div key={index} className="flex flex-col">
                <div
                  className={classNames(
                    book.file && book.file.path ? 'bg-emerald-600' : 'bg-accent-600',
                    'relative mx-auto flex h-60 w-40 flex-col overflow-hidden rounded-l-md border border-primary-700 bg-cover bg-center bg-no-repeat drop-shadow-md',
                  )}
                  style={{ backgroundImage: book.file && book.file.path ? `url('/uploads/${book.file.path}')` : '', backgroundPosition: 'top center' }}
                  title={book.title}
                >
                  <div className="absolute left-1 top-0 h-60 w-1 border-r-2 border-primary-950 bg-secondary-900 opacity-30" />
                  {!book.file && (
                    <>
                      <h3 className="mt-5 line-clamp-5 grow px-3 text-center text-base font-semibold">{book.title}</h3>
                      <p className="text-gray-500 mb-2 line-clamp-3 px-3 text-center text-xs">{book.author}</p>
                    </>
                  )}
                </div>
                <p className="text-gray-500 mt-2 line-clamp-2 text-center text-xs" title={book.author || ''}>
                  {book.author}
                </p>
                <div className="flex items-center justify-center">
                  <button className="button-danger mt-2 !px-4" onClick={() => deleteBookAction(book)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
