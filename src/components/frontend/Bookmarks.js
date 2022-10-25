import { ChevronUpIcon, TagIcon } from '@heroicons/react/24/solid';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import * as React from 'react';
import useStaleSWR from '@/utils/staleSWR';
import NavLink from '@/components/NavLink';
import Masonry from 'react-masonry-css';
import { useRef } from 'react';

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

  const elementsRef = useRef([]);
  return (
    <div className="flex">
      <div className="grow"></div>
      <section id="work" className={'grow-0 px-4 lg:px-0 mt-10'}>
        <div className="max-w-5xl mx-auto">
          <h1 className="font-header leading-tight tracking-wide text-2xl lg:text-3xl font-light">Bookmarks</h1>
          <div>
            {uniqueCategories.map((category, index) => (
              <div key={index} className="group/list">
                <span className="anchor" ref={(ref) => elementsRef.current.push(ref)} />
                <h4 className="text-secondary-700 dark:text-secondary-600 mt-14 group-first/list:mt-5 mb-5 flex items-center gap-2">
                  <TagIcon className="none w-4 h-4" />
                  <span className="flex-none">{category.name}</span>
                  <span className="w-full border-t border-secondary-700 dark:border-secondary-600 border-dashed shrink"></span>
                  <Link
                    href="#bookmarks-0"
                    className="text-secondary-700 dark:text-secondary-600 flex items-center group-first/list:hidden">
                    top<ChevronUpIcon className="inline w-4" />

                  </Link>
                </h4>
                <Masonry breakpointCols={breakpointColumnsObj} className="flex gap-8 w-auto" columnClassName="bg-clip-padding flex flex-col gap-8">
                  {data?.results
                    .filter((x) => x.categoryId == category.id)
                    .map((bookmark, index) => (
                      <div key={`apps-${index}`} className={'p-5 group/card box-card'}>
                        <Link
                          href={bookmark.url}
                          as={bookmark.url}
                          target="_blank"
                          className="block"
                          rel="noopener noreferrer">

                          <h3 className="text-xl tracking-wide flex justify-between">
                            {bookmark.name}
                            <BookmarkIcon className="w-5 group-hover/card:text-secondary-600" />
                          </h3>
                          <p className="text-sm opacity-80 tracking-wide flex items-center gap-2">
                            <span className="block w-5">
                              <Image src={`https://www.google.com/s2/favicons?domain=${bookmark.domain}`} className="m-auto" width="16" height="16" alt={bookmark.domain} />
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
        </div>
      </section>
      <div className="grow relative">
        <div className="fixed hidden xl:block text-sm font-semibold tracking-wider">
          <div className="mb-6 mt-10 ml-4">On this page</div>
          <ul className="ml-4">
            {uniqueCategories.map((category, index) => (
              <li className="my-2" key={`menu-link-${index}`}>
                <NavLink
                  href={`/bookmarks#bookmarks-${index}`}
                  className={'flex items-center gap-2 transition hover:text-primary-900 dark:hover:text-primary-100 hover:underline'}
                  activeClassName={'flex items-center gap-2 transition text-secondary-800 dark:text-secondary-600'}
                >
                  <a onClick={() => elementsRef.current[index].scrollIntoView({ behavior: 'smooth' })}>
                    <TagIcon className="h-4" />
                    {category.name}
                  </a>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
