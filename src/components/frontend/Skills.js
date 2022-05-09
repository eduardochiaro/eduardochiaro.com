import * as React from 'react';
import useStaleSWR from '../../lib/staleSWR';
import SVG from 'react-inlinesvg';
import styles from '../../styles/Skills.module.scss'

export default function Skills () {
  const { data } = useStaleSWR('/api/portfolio/skills');
  return (
    <section className={`px-4 lg:px-0 mt-10`}>
      <span className="anchor" name="skills"/>
      <div className="max-w-5xl mx-auto">
        <h3 className="font-header leading-tight text-2xl lg:text-3xl font-light mb-2">
          What I&apos;m <span className="text-primary-700 dark:text-primary-600">good</span> at...
        </h3>
        <div>
        { data && data.results ? 
            data.results.map((skill, index) => (
            <div key={`skill-${index}`} className="flex items-center mt-1">
              <span className="flex-none font-medium mr-5">{skill.name}</span>
              <span className="w-full border-t border-primary-700 dark:border-primary-600 border-dashed shrink mr-5"></span>
              <div className="flex-none w-12 relative text-white">
                <SVG title={skill.name} alt={skill.name} className={`inline-block w-8 fill-zinc-700 dark:fill-zinc-200`} src={`/images/svg-icons/${skill.logo}`} />
              </div>
              <div className="flex-none w-6/12">
                <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-4 rounded">
                  <div className={`${styles[`bar-${skill.type}`]} bg-blue-600 rounded h-4`} style={{width: skill.percentage + '%'}}></div>
                </div>
              </div>
            </div>
          )) : [
            ...Array(6)
                .fill()
                .map((_, idx) => 0 + idx),
            ].map((x) => (
              <div key={`skill-${x}`} className="flex items-center mt-1">
                <span className="flex-none font-medium mr-5">
                  <div key={x} className="w-12 h-8 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse"></div>
                </span>
                <span className="w-full border-t border-primary-700 dark:border-primary-600 border-dashed shrink mr-5"></span>
                <div className="flex-none w-12 relative">
                  <div key={x} className="w-8 h-8 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse"></div>
                </div>
                <div className="flex-none w-6/12">
                  <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-4 rounded animate-pulse">
                    <div className={`${styles[`bar-node`]} bg-blue-600 rounded h-4`} style={{width: (x * 10) + '%'}}></div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
}