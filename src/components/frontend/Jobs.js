import * as React from 'react';
import useStaleSWR from '@/utils/staleSWR';
import SVG from 'react-inlinesvg';

export default function Jobs() {
  const { data } = useStaleSWR('/api/portfolio/jobs');

  return (
    <section id="work-component" className={'px-4 lg:px-0 mt-10'}>
      <div className="max-w-5xl mx-auto">
        <h3 className="font-header leading-tight tracking-wide text-2xl lg:text-3xl font-light">
          I&apos;ve <span className="overlay-color">worked</span> for...
        </h3>
        <div id="work-list" className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8 mt-4">
          {data && data.results
            ? data.results.map((job, index) => (
                <div className={'text-center z-10 mb-5 relative align-middle'} key={`job-image-${index}`}>
                  <SVG alt={job.name} className={'inline w-full fill-primary-700 dark:fill-primary-200'} src={`/uploads/${job.logo}`} height={30} />
                  {job.disclaimer && <div className="text-xs text-primary-700 dark:text-primary-200 mt-2">{job.disclaimer}</div>}
                </div>
              ))
            : [
                ...Array(6)
                  .fill()
                  .map((_, idx) => 0 + idx),
              ].map((x) => <div key={x} className="w-auto mx-5 h-14 bg-primary-300 dark:bg-primary-600 rounded-md animate-pulse"></div>)}
        </div>
      </div>
    </section>
  );
}
