import { BookmarkAltIcon, LinkIcon, TagIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import Image from 'next/image';
import * as React from 'react';
import useStaleSWR from '../../lib/staleSWR';

export default function Bookmarks() {
  const { data, error } = useStaleSWR('/api/portfolio/bookmarks');

  const categories = data && data.results ? data.results.map((bookmark) => bookmark.category) : [];
  const uniqueCategories = categories.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.id === value.id
    ))
  ).sort((a, b) => (a.name > b.name) ? 1 : -1);
  return (
    <section id="work" className={`px-8 lg:px-0 my-10`}>
      <div className="max-w-5xl mx-auto">
        <h3 className="font-header leading-tight text-2xl lg:text-3xl pr-4 font-light">
          Bookmarks
        </h3>
        { uniqueCategories.map((category, index) => (
          <div key={index} className="mt-4">
            <h4 className="text-primary-800 dark:text-primary-700 mt-10 mb-5 ">
              <TagIcon className="inline-block w-4 h-4 align-text-bottom mr-2" />
              {category.name}</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            { data?.results.filter( x => x.categoryId == category.id).map((bookmark, index) => (
                <div key={`apps-${index}`} className={`rounded-lg shadow-xl bg-zinc-200 dark:bg-zinc-700 p-5 transition hover:ring-4 hover:ring-zinc-300 hover:dark:ring-zinc-600`} >            
                <Link
                  href={bookmark.url}
                  as={bookmark.url}
                  >
                  <a target="_blank" className="inline-block">
                    <h3 className="text-xl">
                      <BookmarkAltIcon className="inline-block align-text-top h-6 mr-2" />
                      {bookmark.name}
                    </h3>
                    <p className="text-sm block opacity-80">
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
            
            </div>
          </div>

        ))}
        
      </div>
    </section>
  )
}