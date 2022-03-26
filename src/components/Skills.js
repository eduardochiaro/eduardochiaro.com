import * as React from 'react';
import SVG from 'react-inlinesvg';
import useStaleSWR from '../lib/staleSWR';
import Gauge from '../elements/Gauge';

export default function Skills () {
  const { data, error } = useStaleSWR('/api/portfolio/skills');

  return (
    <section className={`px-0 sm:px-2 md:px-4`}>
      <span className="anchor" name="skills"/>
      <div className="container mx-auto pt-8">
        <h3 className="font-header leading-tight text-2xl lg:text-4xl font-light mx-4 lg:mx-2 mb-2">
          What I&apos;m <span className="text-terra-cotta-500">good</span> at...
        </h3>
      </div>
      <div className="flex flex-row items-center justify-between container mx-auto">
        <div className={`flex-1 basis-1/3 hidden lg:block`}>
          <SVG src={`/images/bgs/ebooks.svg`} />
        </div>
        <div className="flex-1 basis-2/3 align-top">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8">
          { data && data.results ? 
              data.results.map((skill, index) => (
                <Gauge
                  key={`g-${index}`}
                  value={skill.percentage}
                  skill={skill}
                  placeholder={false}
                  // any other options you want
                />
            )) : [
                ...Array(6)
                  .fill()
                  .map((_, idx) => 0 + idx),
              ].map((x) => (
                <div key={x} className="w-auto mx-5 h-full bg-green-sheen-300 rounded-md animate-pulse"></div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}