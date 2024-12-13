'use client';

import classNames from '@/utils/classNames';
import { Prisma } from '@prisma/client';
import { useEffect, useState } from 'react';
import WireContainer from './WireContainer';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import Card from './Card';
import Book, { BookHeader, BookTitle } from '@/components/ui/Book';

type BookWithTags = Prisma.BookGetPayload<{
  include: {
    tags: true;
    file: true;
  };
}>;

const pageSize = 6;

export default function Books({ data }: { data: BookWithTags[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentPage = searchParams.get('page') || '1';
  const currentTag = searchParams.get('tag');
  //max pages

  const [results, setResults] = useState<BookWithTags[]>([]);
  const [selectedTag, setSelectedTag] = useState<any>(currentTag);
  const [maxPages, setMaxPages] = useState(1);

  //split data by page size
  useEffect(() => {
    if (currentPage) {
      const start = (parseInt(currentPage) - 1) * pageSize;
      const end = start + pageSize;
      if (currentTag) {
        const filteredBooks = data.filter((book: BookWithTags) => {
          return book.tags.some((t) => t.id === parseInt(currentTag));
        });
        setResults(filteredBooks.slice(start, end));
        setMaxPages(Math.ceil(filteredBooks.length / pageSize));
      } else {
        setMaxPages(Math.ceil(data.length / pageSize));
        setResults(data.slice(start, end));
      }
      return;
    }
  }, [data, currentPage, currentTag]);

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
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (tag.id === undefined) {
      setSelectedTag(null);
      setResults(data);
      params.delete('tag');
      replace(`${pathname}?${params.toString()}`);
      return;
    }
    setSelectedTag(tag.id);
    params.set('tag', tag.id);
    replace(`${pathname}?${params.toString()}`);
  };

  const goNextPage = () => {
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) + 1 : 2;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const goPrevPage = () => {
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) - 1 : 1;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <section className={'mt-10 px-4 lg:px-0'}>
      <h1 className="mx-auto h-10 max-w-5xl font-header text-3xl font-light leading-tight tracking-wide lg:text-4xl">
        Books I&apos;ve <span className="text-secondary-700 dark:text-secondary-500">read</span>...
      </h1>
      {currentPage}
      <div className="mx-auto flex max-w-5xl">
        <div className="my-10 w-full md:w-3/4">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
            {results.map((book: BookWithTags, index: number) => {
              const cover = book.file && book.file.path ? process.env.NEXT_PUBLIC_CDN_URL + '/' + book.file.path : '';
              return (
                <Book size="sm" key={index} cover={cover} color={cover ? 'primary' : 'red'}>
                  <BookHeader className="text-xs text-primary-50">{book.author}</BookHeader>
                  <BookTitle className="text-primary-50">{book.title}</BookTitle>
                </Book>
              );
            })}
          </div>
          <div className="mt-10 flex justify-between">
            {parseInt(currentPage) > 1 && (
              <button onClick={() => goPrevPage()} className="rounded-lg bg-primary-300 px-3 py-1 font-semibold text-primary-900">
                <ChevronsLeftIcon className="size-6" />
              </button>
            )}
            <div></div>
            {maxPages > parseInt(currentPage) && (
              <button
                onClick={() => goNextPage()}
                className="box-card-unstyled bg-primary-300 px-3 py-1 font-semibold hover:bg-primary-400 dark:bg-primary-700 dark:hover:bg-primary-900"
              >
                <ChevronsRightIcon className="size-6" />
              </button>
            )}
          </div>
        </div>
        <div className="mb-10 hidden w-full md:block md:w-1/4 md:text-right">
          <h2 className="mb-4 flex h-10 align-bottom font-header text-xl font-light leading-tight tracking-wide md:flex-row-reverse">
            <span className="self-end">Tags</span>
          </h2>
          {tags.length > 0 && (
            <WireContainer type="medium">
              <Card>
                <ul className="text-md text-right !font-sans">
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
              </Card>
            </WireContainer>
          )}
        </div>
      </div>
    </section>
  );
}
