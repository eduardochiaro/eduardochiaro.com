import * as React from 'react';
import SVG from 'react-inlinesvg';
import useSWR from 'swr';
import Gauge from './Gauge';
import styles from '../styles/Skills.module.scss'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Skills () {
  const { data, error } = useSWR('/api/portfolio/skills', fetcher);

  return (
    <section id="skills" className={`${styles.skills} mt-8`}>
      <span className={styles.anchor} id="skills-anchor"/>
      <div className="container mx-auto">
        <h3 className="leading-tight text-2xl lg:text-4xl font-light mx-4 lg:mx-2 mb-2">
          What I&apos;m <span className="text-terra-cotta-900">good</span> at...
        </h3>
      </div>
      <div className="flex flex-row items-center justify-between container mx-auto">
        <div className={`flex-1 basis-1/3 hidden lg:block`}>
          <SVG src={`/images/bgs/ebooks.svg`} />
        </div>
        <div className="flex-1 basis-2/3 align-top">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8">

          {data?.results.map((skill) => (
            <Gauge
              key={`g-${skill.name}`}
              value={skill.percentage}
              skill={skill}
              placeholder={false}
              // any other options you want
            />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}