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
        <h3 className="font-header leading-tight tracking-wide text-3xl lg:text-4xl font-light mb-2">
          What I <span className="overlay-color">wrote</span>...
        </h3>
        <div id="articles-list" className="mt-6 -ml-6">
          {cutReposene
            ? cutReposene.map((article: any, index: number) => (
                <div key={`article-${index}`} className="mb-6 relative">
                  <Link
                    href={article.permalink}
                    className="group block hover:border-l-8 ml-2 hover:ml-0 pb-2 hover:border-secondary-600 dark:hover:border-secondary-600 pl-4"
                  >
                    <div className="flex flex-col md:flex-row items-top gap-4">
                      <h4 className="grow-0 font-medium text-lg tracking-wide">{article.title}</h4>
                      <div className="grow mt-1">
                        <div className="flex flex-row items-center">
                          <span className="w-full dashed-border-t shrink"></span>
                          <span className="w-4 dashed-border-t shrink"></span>
                          <span className="text-sm font-mono whitespace-nowrap px-4">{moment(article.published).format('MM/DD/YYYY')}</span>
                          <span className="flex-none w-12 dashed-border-t"></span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm mt-2 text-primary-600 dark:text-primary-400">{article.content}</p>
                  </Link>
                </div>
              ))
            : [
                ...Array(3)
                  .fill('')
                  .map((_, idx) => 0 + idx),
              ].map((x) => <div key={`article-${x}`} className="flex items-center mt-1"></div>)}
        </div>
      </div>
    </section>
  );
}
