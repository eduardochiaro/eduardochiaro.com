'use client';

import { ChevronUpIcon, TagIcon } from '@heroicons/react/24/solid';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkFullIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import * as React from 'react';
import useStaleSWR from '@/utils/staleSWR';
import Masonry from 'react-masonry-css';
import ImageWithFallback from '../ImageWithFallback';
import emptyIcon from '@/components/icons/Empty';
import { Bookmark, Category, Prisma } from '@prisma/client';
import WireContainer from './WireContainer';

type BookmarkWithCategory = Prisma.BookmarkGetPayload<{
  include: {
    category: true;
  };
}>;

const breakpointColumnsObj = {
  default: 2,
  640: 1,
};

export default function Bookmarks({ data }: { data: BookmarkWithCategory[] }) {
  const categories = data && data ? data.map((bookmark: BookmarkWithCategory) => bookmark.category) : [];
  const uniqueCategories = categories
    .filter((value: any, index: number, self: any) => index === self.findIndex((t: any) => t.id === value.id))
    .sort((a: any, b: any) => (a.name > b.name ? 1 : -1));
  /*
  const menuData = uniqueCategories.map((item, index) => {
    return {
      id: `bookmarks-${index}`,
      text: item.name,
      link: `#bookmarks-${index}`,
      pre: <TagIcon className="h-4" />,
    };
  });
  */
  return (
    <div className="flex">
      <section id="work" className={'mx-auto mt-10 max-w-5xl grow px-4 lg:px-0'}>
        <h1 className="font-header text-3xl font-light leading-tight tracking-wide lg:text-4xl">Bookmarks</h1>
        <div>
          {uniqueCategories.map((category: Category, index: number) => (
            <div key={index} className="group/list">
              <span className="anchor" id={`bookmarks-${index}`} />
              <h4 className="mb-5 mt-14 flex items-center gap-2 group-first/list:mt-5">
                <TagIcon className="none h-4 w-4 text-secondary-600 dark:text-secondary-200" />
                <span className="flex-none text-secondary-600 dark:text-secondary-200">{category.name}</span>
                <span className="dashed-border-t w-full shrink"></span>
                <Link href="#top" className="flex items-center group-first/list:hidden">
                  top
                  <ChevronUpIcon className="inline w-4" />
                </Link>
              </h4>
              <Masonry breakpointCols={breakpointColumnsObj} className="flex w-auto gap-8" columnClassName="bg-clip-padding flex flex-col gap-8">
                {data
                  ?.filter((x: Bookmark) => x.categoryId == category.id)
                  .map((bookmark: any, index: number) => (
                    <WireContainer type="medium" key={`bookmakr-${index}`}>
                      <div className={'group/card box-card relative'}>
                        <Link href={bookmark.url} as={bookmark.url} target="_blank" className="block p-5" rel="noopener noreferrer">
                          <h3 className="mr-10 flex justify-between text-xl tracking-wide">
                            {bookmark.name}
                            <BookmarkFullIcon className="absolute -top-2.5 right-2 size-10 text-secondary-600 group-hover/card:text-accent-600 dark:text-secondary-200" />
                          </h3>
                          <p className="flex items-center gap-2 text-sm tracking-wide opacity-80">
                            <span className="block w-5">
                              <ImageWithFallback
                                src={`https://www.google.com/s2/favicons?domain=${bookmark.domain}`}
                                className="m-auto"
                                width="16"
                                height="16"
                                alt={bookmark.domain}
                                fallbackSrc={emptyIcon}
                              />
                            </span>
                            {bookmark.domain}
                          </p>
                          <p className="mt-4 text-sm">{bookmark.description}</p>
                        </Link>
                      </div>
                    </WireContainer>
                  ))}
              </Masonry>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
