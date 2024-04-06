'use client';

import classNames from '@/utils/classNames';
import { Prisma } from '@prisma/client';
import styles from '@/styles/Book.module.scss';
import { useState } from 'react';

type BookWithTags = Prisma.BookGetPayload<{
  include: {
    tags: true;
    file: true;
  };
}>;

export default function Books({ data }: { data: BookWithTags[] }) {
  const [results, setResults] = useState(data);

  //get unique tags with count from books data as object in array
  const tags = data.reduce((acc: any[], book: BookWithTags) => {
    book.tags.forEach((tag: any) => {
      const index = acc.findIndex((t) => t.name === tag.name);
      if (index === -1) {
        acc.push({ name: tag.name, count: 1 });
      } else {
        acc[index].count++;
      }
    });
    return acc;
  }, []);

  const handleTagClick = (tag: any) => {
    //filter books by tag
    const filteredBooks = data.filter((book: BookWithTags) => {
      return book.tags.some((t) => t.name === tag.name);
    });
    //update results
    setResults(filteredBooks);
  };

  return (
    <section className={'mt-10 px-4 lg:px-0'}>
      <div className="mx-auto max-w-5xl">
        <h1 className="h-10 font-header text-3xl font-light leading-tight tracking-wide lg:text-4xl">Books</h1>
        <div className="mx-auto mt-10">
          <div className="grid grid-cols-4 items-end gap-6">
            {results.map((book: BookWithTags, index: number) => (
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
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10">
          {tags.length > 0 && (
            <div className="box-card mt-10 p-4">
              <h3 className="mb-4 text-xl font-semibold">Tags</h3>
              <div className="flex flex-wrap items-center gap-6 py-4">
                <button className="flex items-center gap-2 text-sm font-semibold" onClick={() => setResults(data)}>
                  All ({data.length})
                </button>
                {tags.map((tag: any, index: number) => (
                  <button key={index} className="flex items-center gap-2 text-sm font-semibold" title={tag.name || ''} onClick={() => handleTagClick(tag)}>
                    {tag.name} ({tag.count})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
