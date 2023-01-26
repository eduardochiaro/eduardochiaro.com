import { ChevronUpIcon, TagIcon } from '@heroicons/react/24/solid';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import * as React from 'react';
import useStaleSWR from '@/utils/staleSWR';
import Masonry from 'react-masonry-css';
import Sidemenu from './Sidemenu';
import ImageWithFallback from '../ImageWithFallback';
import emptyIcon from '../icons/empty';

const breakpointColumnsObj = {
  default: 2,
  640: 1,
};

export default function Bookmarks() {
  const { data } = useStaleSWR('/api/portfolio/bookmarks');

  const categories = data && data.results ? data.results.map((bookmark) => bookmark.category) : [];
  const uniqueCategories = categories
    .filter((value, index, self) => index === self.findIndex((t) => t.id === value.id))
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  const menuData = uniqueCategories.map((item, index) => {
    return {
      id: `bookmarks-${index}`,
      text: item.name,
      link: `#bookmarks-${index}`,
      pre: <TagIcon className="h-4" />,
    };
  });

  return (
    <div className="flex">
      <div className="grow"></div>
      <section id="work" className={'grow px-4 lg:px-0 mt-10 max-w-5xl mx-auto'}>
        <h1 className="font-header leading-tight tracking-wide text-2xl lg:text-3xl font-light">Bookmarks</h1>
        <div>
          {uniqueCategories.map((category, index) => (
            <div key={index} className="group/list">
              <span className="anchor" id={`bookmarks-${index}`} />
              <h4 className="text-secondary-700 dark:text-secondary-600 mt-14 group-first/list:mt-5 mb-5 flex items-center gap-2">
                <TagIcon className="none w-4 h-4" />
                <span className="flex-none">{category.name}</span>
                <span className="w-full border-t border-secondary-800 dark:border-secondary-600 border-dashed shrink"></span>
                <Link href="#top" className="text-secondary-700 dark:text-secondary-600 flex items-center group-first/list:hidden">
                  top
                  <ChevronUpIcon className="inline w-4" />
                </Link>
              </h4>
              <Masonry breakpointCols={breakpointColumnsObj} className="flex gap-8 w-auto" columnClassName="bg-clip-padding flex flex-col gap-8">
                {data?.results
                  .filter((x) => x.categoryId == category.id)
                  .map((bookmark, index) => (
                    <div key={`apps-${index}`} className={'group/card box-card'}>
                      <Link href={bookmark.url} as={bookmark.url} target="_blank" className="p-5 block" rel="noopener noreferrer">
                        <h3 className="text-xl tracking-wide flex justify-between">
                          {bookmark.name}
                          <BookmarkIcon className="w-5 group-hover/card:text-secondary-600" />
                        </h3>
                        <p className="text-sm opacity-80 tracking-wide flex items-center gap-2">
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
                  ))}
              </Masonry>
            </div>
          ))}
        </div>
      </section>
      <Sidemenu menuData={menuData} />
    </div>
  );
}
