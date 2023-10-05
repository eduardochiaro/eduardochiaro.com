'use client';

import * as React from 'react';
import SVG from 'react-inlinesvg';

const works = [
  {
    name: 'Verizon',
    logo: 'Verizon_logo.svg',
  },
  {
    name: 'Getty Images',
    logo: 'Getty_Images_logo.svg',
  },
  {
    name: 'HP',
    logo: 'HP_logo.svg',
  },
  {
    name: 'Samsung',
    logo: 'Samsung_logo.svg',
  },
  {
    name: 'Microsoft',
    logo: 'Microsoft_logo.svg',
  },
  {
    name: 'LG',
    logo: 'LG_logo.svg',
  },
];

const groups = [
  {
    class: 'col-span-2',
    text: '',
  },
  {
    class: 'col-span-4',
    text: (
      <div className="mx-4 flex items-center">
        <div className="dashed-border-l h-5 flex-none"></div>
        <div className="grow">
          <div className="flex flex-row items-center">
            <span className="dashed-border-t w-full shrink"></span>
            <div className="mx-3 whitespace-nowrap text-sm font-normal tracking-wide">
              Projects done through <strong>Flixmedia LTD</strong>
            </div>
            <span className="dashed-border-t w-full shrink"></span>
          </div>
        </div>
        <div className="dashed-border-r h-5 flex-none"></div>
      </div>
    ),
  },
];

export default function Jobs() {
  return (
    <section id="work-component" className={'mt-10 px-4 lg:px-0'}>
      <div className="mx-auto max-w-5xl">
        <h3 className="flex items-center gap-4 font-header text-3xl font-light leading-tight tracking-wide lg:text-4xl">
          <span className="grow">
            I&apos;ve <span className="overlay-color">worked</span> for...
          </span>
          {/*
          <Link href={'/resume'} className="overlay-color text-sm flex items-center gap-1">
            <span>view resume</span>
            <ChevronDoubleRightIcon className="h-3 text-secondary-600 dark:text-secondary-600" />
          </Link>
          */}
        </h3>
        <div id="work-list" className="mt-4 grid grid-cols-2 gap-8 md:grid-cols-3 xl:grid-cols-6">
          {works.map((job, index) => (
            <div className={'relative z-10 mb-5 text-center align-middle'} key={`job-image-${index}`}>
              <SVG title={job.name} className={'inline w-full fill-primary-700 dark:fill-primary-200'} src={`/works/${job.logo}`} height={30} />
            </div>
          ))}
        </div>
        <div className="hidden grid-cols-6 gap-8 xl:grid">
          {groups.map((group, index) => (
            <div className={`${group.class} text-center`} key={`job-group-${index}`}>
              {group.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
