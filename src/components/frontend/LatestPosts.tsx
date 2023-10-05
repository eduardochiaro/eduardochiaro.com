'use client';

import moment from 'moment';
import Link from 'next/link';
import * as React from 'react';
import useStaleSWR from '@/utils/staleSWR';

export default function LatestPosts() {
  const { data } = useStaleSWR('/api/portfolio/blog');
  const cutResponse = data ? data.results.slice(0, 3) : [];
  return (
    <section id="latest-posts-component" className={'mt-10 px-4 lg:px-0'}>
      <div className="mx-auto max-w-5xl">
        <h3 className="mb-2 font-header text-3xl font-light leading-tight tracking-wide lg:text-4xl">
          What I <span className="overlay-color">wrote</span>...
        </h3>
        <div id="articles-list" className="-ml-6 mt-6">
          {cutResponse && cutResponse.length > 0
            ? cutResponse.map((article: any, index: number) => (
                <div key={`article-${index}`} className="relative mb-6">
                  <Link
                    href={article.permalink}
                    className="group ml-2 block pb-2 pl-4 hover:ml-0 hover:border-l-8 hover:border-secondary-600 dark:hover:border-secondary-600"
                  >
                    <div className="items-top flex flex-col gap-4 md:flex-row">
                      <h4 className="grow-0 text-lg font-medium tracking-wide">{article.title}</h4>
                      <div className="mt-1 grow">
                        <div className="flex flex-row items-center">
                          <span className="dashed-border-t w-full shrink"></span>
                          <span className="dashed-border-t w-4 shrink"></span>
                          <span className="whitespace-nowrap px-4 font-mono text-sm">{moment(article.published).format('MM/DD/YYYY')}</span>
                          <span className="dashed-border-t w-12 flex-none"></span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-primary-600 dark:text-primary-400">{article.content}</p>
                  </Link>
                </div>
              ))
            : [
                ...Array(3)
                  .fill('')
                  .map((_, idx) => 0 + idx),
              ].map((x) => (
                <div key={`article-${x}`} className="mb-6 flex  flex-col gap-4">
                  <div className="ml-6 h-6 flex-grow animate-pulse rounded bg-primary-300 dark:bg-primary-600 "></div>
                  <div className="ml-6 h-20 flex-grow animate-pulse rounded bg-primary-300 dark:bg-primary-600 "></div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
