import { ExternalLinkIcon } from '@heroicons/react/solid';
import moment from 'moment';
import Link from 'next/link';
import * as React from 'react';
import useStaleSWR from '../../lib/staleSWR';

export default function LatestPosts () {
  const { data, error } = useStaleSWR('/api/portfolio/blog');
  const cutReposene = (data) ? data.results.slice(0, 3) : [];
  return (
    <section className={`px-8 lg:px-0 my-10`}>
      <span className="anchor" name="posts"/>
      <div className="max-w-5xl mx-auto">
        <h3 className="font-header leading-tight text-2xl lg:text-3xl pr-4 font-light mb-2">
          Recent <span className="text-primary-800 dark:text-primary-700">articles</span> says...
        </h3>
        <div className="mt-6">
        { cutReposene ? 
            cutReposene.map((article, index) => (
            <div key={`article-${index}`} className="mb-8 relative">
              <Link
                href={article.permalink}
                >
                <a className="group block rounded border border-primary-600 dark:border-primary-800 border-dashed shrink p-4">
                  <h4 className="flex-none font-medium text-lg mr-5 group-hover:underline">
                    {article.title}
                    <ExternalLinkIcon className="w-4 h-4 ml-1 hidden group-hover:inline-block" />
                  </h4>
                  <p className="text-sm mt-2">{article.content}</p>
                </a>
              </Link>
              <div className="text-sm font-light tracking-wide absolute -top-3 right-8 bg-zinc-50 dark:bg-zinc-800 px-4 text-zinc-500 dark:text-primary-700">{ moment(article.published).format("MMM Do YYYY")}</div>
            </div>
            )) : [
            ...Array(3)
                .fill()
                .map((_, idx) => 0 + idx),
            ].map((x) => (
              <div key={`article-${x}`} className="flex items-center mt-1">
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
}