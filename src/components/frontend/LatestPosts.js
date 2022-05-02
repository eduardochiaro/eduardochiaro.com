import moment from 'moment';
import Link from 'next/link';
import * as React from 'react';
import useStaleSWR from '../../lib/staleSWR';

export default function LatestPosts () {
  const { data, error } = useStaleSWR('/api/portfolio/blog');
  const cutReposene = (data) ? data.results.slice(0, 3) : [];
  return (
    <section className={`px-4 lg:px-0 mt-10`}>
      <span className="anchor" name="articles"/>
      <div className="max-w-5xl mx-auto">
        <h3 className="font-header leading-tight text-2xl lg:text-3xl pr-4 font-light mb-2">
          Recent <span className="text-primary-800 dark:text-primary-700">articles</span> says...
        </h3>
        <div className="mt-6 -ml-6">
        { cutReposene ? 
            cutReposene.map((article, index) => (
            <div key={`article-${index}`} className="mb-8 relative">
              <Link
                href={article.permalink}
                >
                <a className="group block border-l-8 border-zinc-50 dark:border-zinc-800 hover:border-primary-700 dark:hover:border-primary-700 pl-4">
                  <div className="flex flex-row items-top">
                    <h4 className="grow-0 font-medium text-lg">
                      {article.title}
                    </h4>
                    <div className="grow ml-4 mt-1">
                      <div className="flex flex-row items-center">
                        <span className="w-full border-t border-primary-600 dark:border-primary-800 border-dashed shrink"></span>
                        <span className="w-4 border-t border-primary-600 dark:border-primary-800 border-dashed shrink"></span>
                        <span className="text-sm font-light tracking-wide whitespace-nowrap bg-zinc-50 dark:bg-zinc-800 px-4 text-zinc-500 dark:text-primary-700">{ moment(article.published).format("MMM Do YYYY")}</span>
                        <span className="flex-none w-12 border-t border-primary-600 dark:border-primary-800 border-dashed"></span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm mt-2 opacity-60">{article.content}</p>
                </a>
              </Link>
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