'use client';

import * as React from 'react';
import useSWR from 'swr';
import { HashtagIcon } from '@heroicons/react/24/solid';
import { ClockIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import { fetcher } from '@/utils/staleSWR';
import ImageWithFallback from '@/components/ImageWithFallback';

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function GitHub() {
  const { data } = useSWR('/api/portfolio/github', fetcher);

  const cutResponse = data ? data.results.filter((x: any) => !x.isArchived).slice(0, 6) : [];

  const LoadImage = ({ src, alt }: { src: string; alt: string }) => {
    const pick = randomIntFromInterval(1, 4);
    const replaceSrc = src.includes('githubusercontent.com') ? src : `/images/random/${pick}.jpg`;
    return (
      <ImageWithFallback
        fallbackSrc={`/images/random/${pick}.jpg`}
        src={replaceSrc}
        fill
        sizes="33vw"
        className="z-10 object-cover grayscale hover:grayscale-0"
        alt={alt}
      />
    );
  };

  const items =
    cutResponse.length > 0
      ? cutResponse.map((repo: any, index: number) => (
          <div className="box-card max-h-min overflow-hidden" key={`repo-${index}`}>
            <a href={repo.url} className="flew-wrap text-decoration-none flex h-full w-full overflow-hidden">
              <div className="peer relative w-1/3 flex-none transition-width duration-300 ease-in-out hover:w-2/3 md:hidden lg:block lg:w-1/3">
                <LoadImage src={repo.openGraphImageUrl} alt={repo.name} />
              </div>
              <div className="relative min-h-min w-full whitespace-nowrap p-4 md:w-2/3">
                <h4 className="mt-2 font-header text-lg font-semibold tracking-wider ">{repo.name}</h4>
                <p className="mb-2 mt-4 text-xs antialiased">{repo.description}</p>
                <p className="absolute right-4 top-2 flex items-center text-xs opacity-60">
                  <ClockIcon title="last updated" className="mr-2 h-3" /> {moment(repo.pushedAt).fromNow()}
                </p>
                {repo.languages.slice(0, 2).map((language: any, index: number) => (
                  <div key={index} className="mr-4 inline-block text-xs antialiased">
                    <span
                      className="mb-1 mr-2 inline-block h-3 w-3 rounded-full border border-primary-500 align-middle dark:border-primary-800"
                      style={{ backgroundColor: language.color }}
                    ></span>
                    {language.name}
                  </div>
                ))}
                <div className="mt-4">
                  {repo.topics.slice(0, 2).map((topic: string) => (
                    <div
                      className="z-30 mb-2 mr-2 inline-block rounded-full bg-accent-300 px-3 py-1 text-xs font-semibold antialiased dark:bg-accent-700 "
                      key={topic}
                    >
                      <div className="flex items-center">
                        <HashtagIcon className="w-3" />
                        {topic}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </a>
          </div>
        ))
      : [
          ...Array(6)
            .fill('')
            .map((_, idx) => 0 + idx),
        ].map((x) => <div className="box-card h-40 max-h-min animate-pulse overflow-hidden" key={`repo-${x}`}></div>);

  return (
    <section id="github-component" className={'mt-10 px-4 lg:px-0'}>
      <div className="mx-auto max-w-5xl">
        <h3 className="font-header text-3xl font-light leading-tight tracking-wide lg:text-4xl">
          What I&apos;ve <span className="overlay-color">coded</span> recently...
        </h3>
        <div id="github-list" className="mt-5 grid grid-cols-1 gap-4 pb-10 md:grid-cols-3 lg:grid-cols-2 xl:gap-8">
          {items}
        </div>
      </div>
    </section>
  );
}
