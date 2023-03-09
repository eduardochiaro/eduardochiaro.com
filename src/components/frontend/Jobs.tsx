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
      <div className="flex items-center mx-4">
        <div className="flex-none dashed-border-l h-5"></div>
        <div className="grow">
          <div className="flex flex-row items-center">
            <span className="w-full dashed-border-t shrink"></span>
            <div className="text-sm font-normal tracking-wide whitespace-nowrap mx-3">
              Projects done through <strong>Flixmedia LTD</strong>
            </div>
            <span className="w-full dashed-border-t shrink"></span>
          </div>
        </div>
        <div className="flex-none dashed-border-r h-5"></div>
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
            <ChevronDoubleRightIcon className="h-3 text-secondary-600 dark:text-secondary-600" />
          </Link>
          */}
        </h3>
        <div id="work-list" className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8 mt-4">
          {works.map((job, index) => (
            <div className={'text-center z-10 mb-5 relative align-middle'} key={`job-image-${index}`}>
              <SVG title={job.name} className={'inline w-full fill-primary-700 dark:fill-primary-200'} src={`/works/${job.logo}`} height={30} />
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