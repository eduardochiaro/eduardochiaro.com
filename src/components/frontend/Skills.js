import * as React from 'react';
import useStaleSWR from '../../utils/staleSWR';
import SVG from 'react-inlinesvg';
import styles from '../../styles/Skills.module.scss'

export default function Skills () {
  const { data } = useStaleSWR('/api/portfolio/skills');
  return (
    <section id="skills" className={`px-4 lg:px-0 mt-10`}>
      <span className="anchor" name="skills"/>
      <div className="max-w-5xl mx-auto">
        <h3 className="font-header leading-tight tracking-wide text-2xl lg:text-3xl font-light mb-2">
          What I&apos;m <span className="overlay-color">good</span> at...
        </h3>
        <div id="skills-list">
        { data && data.results ? 
            data.results.map((skill, index) => (
            <div key={`skill-${index}`} className="flex items-center gap-5 mt-1">
              <span className="flex-none font-medium">{skill.name}</span>
              <span className="w-full border-t border-primary-700 dark:border-primary-600 border-dashed shrink"></span>
              <SVG title={skill.name} alt={skill.name} className={`flex-none w-8 ${styles[`color-${skill.type}`]}  dark:fill-zinc-200`} src={`/images/svg-icons/${skill.logo}`} />
              <div className="flex-none w-6/12">
                <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-4 rounded">
                  <div className={`${styles[`bar-${skill.type}`]} rounded h-4`} style={{width: skill.percentage + '%'}}></div>
                </div>
              </div>
            </div>
          )) : [
            ...Array(6)
                .fill()
                .map((_, idx) => 0 + idx),
            ].map((x) => (
              <div key={`skill-${x}`} className="flex items-center gap-5 mt-1">
                <span className="flex-none font-medium mr-5">
                  <div key={x} className="w-12 h-6 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse"></div>
                </span>
                <span className="w-full border-t border-primary-700 dark:border-primary-600 border-dashed shrink mr-5"></span>
                <div key={x} className="flex-none w-6 h-6 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse"></div>
                <div className="flex-none w-6/12">
                  <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-4 rounded animate-pulse">
                    <div className={`${styles[`bar-node`]} rounded h-4`} style={{width: (x * 10) + '%'}}></div>
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