import * as React from 'react';
import useStaleSWR from '../lib/staleSWR';
import Gauge from '../elements/Gauge';

export default function Skills () {
  const { data, error } = useStaleSWR('/api/portfolio/skills');

  return (
    <section className={`px-8 lg:px-0 my-10`}>
      <span className="anchor" name="skills"/>
      <div className="max-w-5xl mx-auto">
        <h3 className="font-header leading-tight text-2xl lg:text-3xl pr-4 font-light">
          What I&apos;m <span className="text-isabelline-700">good</span> at...
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8 mt-4">
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
    </section>
  );
}