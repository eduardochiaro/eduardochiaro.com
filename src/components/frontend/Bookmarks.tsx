'use client';

import { ChevronUpIcon, TagIcon, BookmarkIcon } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
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
  return (
    <div>
      {uniqueCategories.map((category: Category, index: number) => (
        <div key={index} className="group/list">
          <span className="anchor" id={`bookmarks-${index}`} />
          <h4 className="mt-14 mb-5 flex items-center gap-2 group-first/list:mt-5">
            <TagIcon className="none text-secondary-600 dark:text-secondary-200 h-4 w-4" />
            <span className="text-secondary-600 dark:text-secondary-200 flex-none">{category.name}</span>
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
                        <BookmarkIcon className="fill-secondary-600 text-secondary-600 group-hover/card:text-accent-600 dark:fill-secondary-200 dark:text-secondary-200 absolute -top-2.5 right-2 size-10" />
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
  );
}
