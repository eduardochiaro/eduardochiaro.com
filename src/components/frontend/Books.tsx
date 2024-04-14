'use client';

import classNames from '@/utils/classNames';
import { Prisma } from '@prisma/client';
import styles from '@/styles/Book.module.scss';
import { useState } from 'react';
import WireContainer from '../WireContainer';

type BookWithTags = Prisma.BookGetPayload<{
  include: {
    tags: true;
    file: true;
  };
}>;

export default function Books({ data }: { data: BookWithTags[] }) {
  const [results, setResults] = useState(data);
  const [selectedTag, setSelectedTag] = useState<any>(null);

  //get unique tags with count from books data as object in array
  const tags = data.reduce((acc: any[], book: BookWithTags) => {
    book.tags.forEach((tag: any) => {
      const index = acc.findIndex((t) => t.name === tag.name);
      if (index === -1) {
        acc.push({ id: tag.id, name: tag.name, count: 1 });
      } else {
        acc[index].count++;
      }
    });
    return acc;
  }, []);

  const handleTagClick = (tag: any) => {
    if (tag.id === undefined) {
      setSelectedTag(null);
      setResults(data);
      return;
    }
    setSelectedTag(tag.id);
    //filter books by tag
    const filteredBooks = data.filter((book: BookWithTags) => {
      return book.tags.some((t) => t.name === tag.name);
    });
    //update results
    setResults(filteredBooks);
  };

  return (
    <section className={'mt-10 px-4 lg:px-0'}>
      <div className="mx-auto flex max-w-5xl flex-wrap">
        <div className="mb-10 basis-full md:basis-3/4">
          <h1 className="h-10 font-header text-3xl font-light leading-tight tracking-wide lg:text-4xl">
            Books I&apos;ve <span className="overlay-color">read</span>...
          </h1>
          <div className="mx-auto mt-10">
            <div className="grid grow grid-cols-3 items-end gap-16 px-10">
              {results.map((book: BookWithTags, index: number) => (
                <div key={index} className="flex flex-col">
                  <div
                    className={classNames(
                      book.file && book.file.path ? 'bg-emerald-600' : 'bg-cyan-600',
                      styles['book'],
                      'text-primary-300 transition-all hover:scale-125',
                    )}
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
                  <p
                    className="z-10 line-clamp-2 rounded-sm border border-primary-600 bg-primary-300 py-0.5 text-center text-xs capitalize text-primary-500 shadow-md shadow-primary-700 dark:bg-primary-700 dark:shadow-primary-950"
                    title={book.title || ''}
                  >
                    {book.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-10 basis-full md:basis-1/4 md:text-right">
          <h2 className="mb-8 flex h-10 align-bottom font-header text-xl font-light leading-tight tracking-wide md:flex-row-reverse">
            <span className="self-end">Tags</span>
          </h2>
          {tags.length > 0 && (
            <WireContainer type="medium">
              <ul className="card text-md text-right !font-sans">
                <li className="flex h-10 justify-end">
                  <button
                    className={classNames('flex items-center gap-2', selectedTag == null && 'font-semibold underline')}
                    onClick={() => handleTagClick({})}
                  >
                    All ({data.length})
                  </button>
                </li>
                {tags.map((tag: any, index: number) => (
                  <li key={index} className="flex h-10 justify-end">
                    <button
                      className={classNames('flex items-center gap-2', selectedTag == tag.id && 'font-semibold underline')}
                      title={tag.name || ''}
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag.name} ({tag.count})
                    </button>
                  </li>
                ))}
              </ul>
            </WireContainer>
          )}
        </div>
      </div>
    </section>
  );
}
