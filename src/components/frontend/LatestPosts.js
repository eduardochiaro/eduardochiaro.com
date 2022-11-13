import moment from 'moment';
import Link from 'next/link';
import * as React from 'react';
import useStaleSWR from '@/utils/staleSWR';

export default function LatestPosts() {
  const { data } = useStaleSWR('/api/portfolio/blog');
  const cutReposene = data ? data.results.slice(0, 3) : [];
  return (
    <section id="latest-posts-component" className={'px-4 lg:px-0 mt-10'}>
      <div className="max-w-5xl mx-auto">
        <h3 className="font-header leading-tight tracking-wide text-2xl lg:text-3xl font-light mb-2">
          Recent <span className="overlay-color">articles</span> says...
        </h3>
        <div id="articles-list" className="mt-6 -ml-6">
          {cutReposene
            ? cutReposene.map((article, index) => (
                <div key={`article-${index}`} className="mb-6 relative">
                  <Link
                    href={article.permalink}
                    className="group block border-l-8 pb-2 border-primary-50 dark:border-primary-800 hover:border-secondary-700 dark:hover:border-secondary-600 pl-4"
                  >
                    <div className="flex flex-row items-top">
                      <h4 className="grow-0 font-medium text-lg tracking-wide">{article.title}</h4>
                      <div className="grow ml-4 mt-1">
                        <div className="flex flex-row items-center">
                          <span className="w-full border-t border-secondary-700 dark:border-secondary-600 border-dashed shrink"></span>
                          <span className="w-4 border-t border-secondary-700 dark:border-secondary-600 border-dashed shrink"></span>
                          <span className="text-sm font-mono whitespace-nowrap bg-primary-50 dark:bg-primary-800 px-4 overlay-color">
                            {moment(article.published).format('MM/DD/YYYY')}
                          </span>
                          <span className="flex-none w-12 border-t border-secondary-700 dark:border-secondary-600 border-dashed"></span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm mt-2 text-primary-600 dark:text-primary-400">{article.content}</p>
                  </Link>
                </div>
              ))
            : [
                ...Array(3)
                  .fill()
                  .map((_, idx) => 0 + idx),
              ].map((x) => <div key={`article-${x}`} className="flex items-center mt-1"></div>)}
        </div>
      </div>
    </section>
  );
}
