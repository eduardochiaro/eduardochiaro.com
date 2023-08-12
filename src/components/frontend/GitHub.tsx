'use client';

import * as React from 'react';
import useSWR from 'swr';
import { HashtagIcon } from '@heroicons/react/24/solid';
import { ClockIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import { fetcher } from '@/utils/staleSWR';
import ImageWithFallback from "@/components/ImageWithFallback";

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
    return <ImageWithFallback fallbackSrc={`/images/random/${pick}.jpg`} src={replaceSrc} fill sizes="33vw" className="z-10 object-cover grayscale hover:grayscale-0" alt={alt} />;
  };

  const items = cutResponse.length > 0 ? cutResponse.map((repo: any, index: number) => (
    <div className="overflow-hidden box-card max-h-min" key={`repo-${index}`}>
      <a href={repo.url} className="flex flew-wrap w-full text-decoration-none overflow-hidden h-full">
        <div className="relative transition-width ease-in-out duration-300 flex-none peer w-1/3 md:hidden lg:block lg:w-1/3 hover:w-2/3">
          <LoadImage src={repo.openGraphImageUrl} alt={repo.name} />
        </div>
        <div className="w-full md:w-2/3 p-4 relative whitespace-nowrap min-h-min">
          <h4 className="mt-2 text-lg font-semibold font-header tracking-wider ">{repo.name}</h4>
          <p className="mt-4 mb-2 text-xs antialiased">{repo.description}</p>
          <p className="text-xs opacity-60 absolute top-2 right-4 flex items-center">
            <ClockIcon title="last updated" className="h-3 mr-2" /> {moment(repo.pushedAt).fromNow()}
          </p>
          {repo.languages.slice(0, 2).map((language: any, index: number) => (
            <div key={index} className="inline-block mr-4 text-xs antialiased">
              <span
                className="inline-block w-3 h-3 align-middle mb-1 border border-primary-500 dark:border-primary-800 rounded-full mr-2"
                style={{ backgroundColor: language.color }}
              ></span>
              {language.name}
            </div>
          ))}
          <div className="mt-4">
            {repo.topics.slice(0, 2).map((topic: string) => (
              <div
                className="bg-accent-300 dark:bg-accent-700 rounded-full px-3 py-1 text-xs antialiased font-semibold mr-2 mb-2 inline-block z-30 "
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
  )) : [
    ...Array(6)
      .fill('')
      .map((_, idx) => 0 + idx),
  ].map((x) => ( 
    <div className="overflow-hidden box-card max-h-min h-40 animate-pulse" key={`repo-${x}`}>

    </div>
  ));

  return (
    <section id="github-component" className={'px-4 lg:px-0 mt-10'}>
      <div className="max-w-5xl mx-auto">
        <h3 className="font-header leading-tight tracking-wide text-3xl lg:text-4xl font-light">
          What I&apos;ve <span className="overlay-color">coded</span> recently...
        </h3>
        <div id="github-list" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-4 xl:gap-8 mt-5 pb-10">
          { items }
        </div>
      </div>
    </section>
  );
}
