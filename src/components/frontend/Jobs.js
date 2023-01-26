import { ChevronDoubleRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
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
      <div className="flex items-center">
        <div className="flex-none border-dashed border-l border-secondary-800 dark:border-secondary-600 h-5"></div>
        <div className="grow">
          <div className="flex flex-row items-center">
            <span className="w-full border-t border-secondary-800 dark:border-secondary-600 border-dashed shrink"></span>
            <div className={'text-sm font-light tracking-wide whitespace-nowrap mx-3'}>Projects done through Flixmedia LTD</div>
            <span className="w-full border-t border-secondary-800 dark:border-secondary-600 border-dashed shrink"></span>
          </div>
        </div>
        <div className="flex-none border-dashed border-r border-secondary-800 dark:border-secondary-600 h-5"></div>
      </div>
    ),
  },
];

export default function Jobs() {
  return (
    <section id="work-component" className={'px-4 lg:px-0 mt-10'}>
      <div className="max-w-5xl mx-auto">
        <h3 className="font-header leading-tight tracking-wide text-2xl lg:text-3xl font-light flex items-center gap-4">
          <span className="grow">
            I&apos;ve <span className="overlay-color">worked</span> for...
          </span>
          {/*
          <Link href={'/resume'} className="overlay-color text-sm flex items-center gap-1">
            <span>view resume</span>
            <ChevronDoubleRightIcon className="h-3 text-secondary-700 dark:text-secondary-600" />
          </Link>
          */}
        </h3>
        <div id="work-list" className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8 mt-4">
          {works.map((job, index) => (
            <div className={'text-center z-10 mb-5 relative align-middle'} key={`job-image-${index}`}>
              <SVG alt={job.name} className={'inline w-full fill-primary-700 dark:fill-primary-200'} src={`/works/${job.logo}`} height={30} />
            </div>
          ))}
        </div>
        <div className="hidden xl:grid grid-cols-6 gap-8">
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
