import { LinkIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import * as React from 'react';
import useStaleSWR from '../lib/staleSWR';

export default function Bookmarks() {
  const { data, error } = useStaleSWR('/api/portfolio/bookmarks');
  return (
    <section id="work" className={`px-8 lg:px-0 my-10`}>
      <div className="max-w-5xl mx-auto">
        <h3 className="font-header leading-tight text-2xl lg:text-3xl pr-4 font-light">
          Bookmarks
        </h3>
        { data?.results.map((bookmark, index) => (
          <div className={`flex flex-wrap mt-5 border rounded border-independence-200 dark:border-zinc-500 bg-zinc-200 dark:bg-zinc-700 p-5`} key={`apps-${index}`} >
            <h3 className="text-xl">
              <Link
                href={bookmark.url}
                as={bookmark.url}
                >
                <a target="_blank">
                  <LinkIcon className="inline-block align-text-top w-5 mr-2" />
                  {bookmark.name}
                  <p className="text-sm opacity-80">{bookmark.domain}</p>
                </a>
              </Link>
              </h3>
            <p className="mt-4">{bookmark.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}