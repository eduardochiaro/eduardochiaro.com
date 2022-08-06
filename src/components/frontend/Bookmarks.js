import { BookmarkIcon, ChevronUpIcon, TagIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import Image from 'next/image';
import * as React from 'react';
import useStaleSWR from '../../utils/staleSWR';
import NavLink from '../NavLink';
import Masonry from 'react-masonry-css';
const breakpointColumnsObj = {
  default: 2,
  640: 1
};

export default function Bookmarks() {
  const { data } = useStaleSWR('/api/portfolio/bookmarks');

  const categories = data && data.results ? data.results.map((bookmark) => bookmark.category) : [];
  const uniqueCategories = categories.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.id === value.id
    ))
  ).sort((a, b) => (a.name > b.name) ? 1 : -1);
  return (
    <>
    <section id="work" className={`px-4 lg:px-0 mt-10`}>
      <div className="max-w-5xl mx-auto">
        <h1 className="font-header leading-tight tracking-wide text-2xl lg:text-3xl font-light">
          Bookmarks
        </h1>
        <div>
        { uniqueCategories.map((category, index) => (
          <div key={index} className="group">
            <span className="anchor" name={`bookmarks-${index}`}/>
            <h4 className="text-primary-700 dark:text-primary-600 mt-14 group-first:mt-5 mb-5 flex items-center gap-2">
              <TagIcon className="none w-4 h-4" />
              <span className="flex-none">{category.name}</span>
              <span className="w-full border-t border-primary-700 dark:border-primary-600 border-dashed shrink"></span>
              <Link
                href="#bookmarks-0">
                  <a className="text-primary-700 dark:text-primary-600 flex items-center group-first:hidden">top <ChevronUpIcon className="inline w-4"/></a>
                </Link>
            </h4>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex gap-8 w-auto"
              columnClassName="bg-clip-padding flex flex-col gap-8">
              { data?.results.filter( x => x.categoryId == category.id).map((bookmark, index) => (
                <div key={`apps-${index}`} className={`p-5 box-card`} >            
                  <Link
                    href={bookmark.url}
                    as={bookmark.url}
                    >
                    <a target="_blank" className="inline-block">
                      <h3 className="text-xl tracking-wide">
                        <BookmarkIcon className="inline-block align-text-top h-6 mr-1" />
                        {bookmark.name}
                      </h3>
                      <p className="text-sm block opacity-80 tracking-wide">
                        <span className="inline-block align-sub mr-2 ml-1">
                          <Image
                            layout="fixed"
                            src={`http://www.google.com/s2/favicons?domain=${bookmark.domain}`}
                            width="16"
                            height="16"
                            alt={bookmark.domain}
                            />
                        </span>
                        {bookmark.domain}
                        </p>
                      <p className="mt-4 text-sm">{bookmark.description}</p>
                    </a>
                  </Link>
                </div>
              ))}
            </Masonry>
          </div>
        ))}
        </div>
      </div>
    </section>
    <div className="hidden xl:block fixed top-40 left-10 text-sm font-semibold tracking-wider">
      <div className="mb-6">On this page</div>
      <ul className="">
        { uniqueCategories.map((category, index) => (
          <li 
            className="my-2"
            key={`menu-link-${index}`}>
              <NavLink 
                href={ index == 0 ? `/bookmarks` : `/bookmarks#bookmarks-${index}` }
                as={`/bookmarks#bookmarks-${index}`}
                className={`flex items-center gap-2 transition hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline opacity-60 hover:opacity-100`} 
                activeClassName={`flex items-center gap-2 transition text-primary-700 dark:text-primary-600`}
              >
                <a>
                  <TagIcon className="h-4" />
                  {category.name}
                </a>
              </NavLink>
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}