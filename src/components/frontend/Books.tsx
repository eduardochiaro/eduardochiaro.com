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

const randomHeight = () => {
  // random number between 128 and 160
  const height = Math.floor(Math.random() * (220 - 180 + 1)) + 180;
  return height;
};

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
            <div className="flex flex-col">
              <div className="mx-4 flex h-72 items-end gap-0">
                {results.map((book: BookWithTags, index: number) => (
                  <div key={index} className="group">
                    <div
                      className="w-10 overflow-hidden rounded-sm border-l-2 border-r-2 border-primary-800 bg-cyan-600 ring-1 ring-primary-700 group-hover:hidden"
                      style={{
                        minHeight: randomHeight(),
                        writingMode: 'vertical-lr',
                        backgroundImage: book.file && book.file.path ? `url('/uploads/${book.file.path}')` : '',
                        backgroundPosition: 'top center',
                      }}
                    >
                      <div className="px-2 py-2 font-header text-primary-50 backdrop-blur-3xl">{book.title}</div>
                    </div>
                    <div key={index} className="hidden flex-col group-hover:flex">
                      <div
                        className={classNames(book.file && book.file.path ? 'bg-emerald-600' : 'bg-cyan-600', styles['book'], 'text-primary-300')}
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
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-2 rounded-lg bg-amber-950 drop-shadow-md"></div>
              <div className="mx-auto flex w-1/2 justify-between">
                <div className="size-3 rounded-b-full bg-primary-950 drop-shadow-md"></div>
                <div className="size-3 rounded-b-full bg-primary-950 drop-shadow-md"></div>
              </div>
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
