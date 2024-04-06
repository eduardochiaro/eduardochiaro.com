'use client';

import { useReducer, useState } from 'react';
import { Input } from '../form';
import SpinnerIcon from '@/components/icons/Spinner';
import { addBook, deleteBook, deleteBookTag, getBookTags, getBooks, updateBookTagPublished } from '@/actions/books';
import { BookTag, Prisma } from '@prisma/client';
import classNames from '@/utils/classNames';
import { Disclosure } from '@headlessui/react';
import { CheckIcon, TrashIcon } from '@heroicons/react/16/solid';
import styles from '@/styles/Book.module.scss';

type BookExpanded = Prisma.BookGetPayload<{ include: { file: true; tags: true } }>;

export default function BookSearch({ books, tags }: { books: BookExpanded[]; tags: any[] }) {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<BookExpanded[]>(books);
  const [tagResults, setTags] = useState<any[]>(tags);

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

  const changePublishedStatus = (tag: BookTag) => {
    return async () => {
      await updateBookTagPublished(tag);
      return updateSavedBooks();
    };
  };

  const handleDeleteTag = async (tag: BookTag) => {
    await deleteBookTag(tag);
    return updateSavedBooks();
  };

  const handleSearch = () => {
    //fetch data from https://openlibrary.org/search.json
    setIsLoading(true);

    const response = fetch(`https://openlibrary.org/search.json?q=${search}&fields=title,author_name,cover_i,isbn,subject&limit=100&offset=0`)
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
              tags: book.subject
                ? book.subject.map((tag: string) => {
                    return { name: tag };
                  })
                : [],
            };
          }),
        });
      })
      .catch((error) => console.error(error));
  };

  const updateSavedBooks = async () => {
    const books = await getBooks();
    setResults(books);

    const tags = await getBookTags();
    setTags(tags);
  };

  const addBookAction = async (book: BookExpanded) => {
    await addBook(book);
    return updateSavedBooks();
  };

  const deleteBookAction = async (book: BookExpanded) => {
    await deleteBook(book);
    return updateSavedBooks();
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
        <div className="mt-10 flex flex-col gap-10">
          <div className="relative flex">
            <label className="flex items-center gap-2">
              <span className="text-gray-500 text-sm font-semibold">Results:</span>
              <span className="text-gray-800 text-sm">
                {data.numFound} (show {data.numFound < 100 ? data.numFound : 100})
              </span>
            </label>
          </div>
          <div
            className="flex max-w-screen-lg items-start gap-6 space-x-6 overflow-x-auto pb-4"
            role="menu"
            aria-orientation="horizontal"
            aria-labelledby="menu-button"
          >
            {data.results.map((book: BookExpanded, index: number) => (
              <div key={index} className="flex w-44 flex-col">
                <p className="text-gray-500 mb-1 line-clamp-2 text-center text-sm" title={book.author || ''}>
                  {book.author}
                </p>

                <div
                  className={classNames(book.file && book.file.path ? 'bg-emerald-600' : 'bg-accent-600', styles['book'])}
                  style={{
                    backgroundImage: book.file?.path ? `url('${book.file.path}')` : '',
                    backgroundPosition: 'top center',
                  }}
                  title={book.title}
                >
                  {(!book.file || !book.file.path) && (
                    <>
                      <h3>{book.title}</h3>
                      <h4>{book.author}</h4>
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
      )}
      {tagResults.length > 0 && (
        <div className="box-card mt-10 px-4">
          <Disclosure>
            <Disclosure.Button className="py-2 font-semibold">Tags ({tagResults.length})</Disclosure.Button>
            <Disclosure.Panel className="flex flex-wrap items-center gap-6 py-4">
              {tagResults.map((tag: any, index: number) => (
                <div key={index} className="group line-clamp-2 flex items-center gap-2 text-sm" title={tag.name || ''}>
                  <button className="h-4 w-4 rounded bg-primary-400" onClick={changePublishedStatus(tag)}>
                    {tag.published && <CheckIcon className="h-4 text-primary-950" />}
                  </button>
                  <div className="grow gap-2">
                    {tag.name} {tag._count ? `(${tag._count.books})` : ''}
                  </div>
                  <button className="hidden group-hover:block" onClick={() => handleDeleteTag(tag)}>
                    <TrashIcon className="w-5" />
                  </button>
                </div>
              ))}
            </Disclosure.Panel>
          </Disclosure>
        </div>
      )}
      {results.length > 0 && (
        <div className="mt-10">
          <h3 className="my-4 text-xl font-semibold">Saved Books</h3>
          <div className="grid grid-cols-4 items-end gap-6">
            {results.map((book: BookExpanded, index: number) => (
              <div key={index} className="flex flex-col">
                <div
                  className={classNames(book.file && book.file.path ? 'bg-emerald-600' : 'bg-accent-600', styles['book'])}
                  style={{ backgroundImage: book.file && book.file.path ? `url('/uploads/${book.file.path}')` : '', backgroundPosition: 'top center' }}
                  title={book.title}
                >
                  {!book.file && (
                    <>
                      <h3>{book.title}</h3>
                      <h4>{book.author}</h4>
                    </>
                  )}
                </div>
                <p className="text-gray-500 mt-2 line-clamp-2 text-center text-xs" title={book.title || ''}>
                  {book.title}
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
