import * as React from 'react';
import useStaleSWR from '@/utils/staleSWR';
import SVG from 'react-inlinesvg';
import styles from '@/styles/Skills.module.scss';
import { Skill } from '@prisma/client';

export default function Skills() {
  const { data } = useStaleSWR('/api/portfolio/skills');
  return (
    <section id="skills-component" className={'px-4 lg:px-0 mt-10 relative'}>
      <div className="max-w-5xl mx-auto">
        <h3 className="font-header leading-tight tracking-wide text-2xl lg:text-3xl font-light mb-2">
          What I&apos;m <span className="overlay-color">good</span> at...
        </h3>
        <div id="skills-list">
          {data && data.results
            ? data.results.map((skill: Skill, index: number) => (
                <div key={`skill-${index}`} className="flex items-center gap-5 mt-1">
                  <span className="flex-none font-medium font-mono">{skill.name}</span>
                  <span className="w-full dashed-border-t shrink"></span>
                  <SVG
                    title={skill.name}
                    className={`flex-none w-8 ${styles[`color-${skill.type}`]}  dark:fill-primary-200`}
                    src={`/images/svg-icons/${skill.logo}`}
                  />
                  <div className="flex-none w-6/12 md:w-9/12">
                    <div className="w-full bg-primary-200 dark:bg-primary-700 h-4 rounded">
                      <div className={`${styles[`bar-${skill.type}`]} rounded h-4`} style={{ width: skill.percentage + '%' }}></div>
                    </div>
                  </div>
                </div>
              ))
            : [
                ...Array(6)
                  .fill('')
                  .map((_, idx) => 0 + idx),
              ].map((x) => (
                <div key={`skill-${x}`} className="flex items-center gap-5 mt-1">
                  <span className="flex-none font-medium">
                    <div key={x} className="w-12 h-6 bg-primary-300 dark:bg-primary-600 rounded animate-pulse"></div>
                  </span>
                  <span className="w-full dashed-border-t shrink"></span>
                  <div key={x} className="flex-none w-8 h-8 bg-primary-300 dark:bg-primary-600 rounded-full animate-pulse"></div>
                  <div className="flex-none w-6/12 md:w-9/12">
                    <div className="w-full bg-primary-200 dark:bg-primary-700 h-4 rounded animate-pulse">
                      <div className={`${styles['bar-node']} rounded h-4`} style={{ width: x * 10 + '%' }}></div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
