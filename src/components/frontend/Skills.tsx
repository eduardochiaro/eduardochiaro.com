'use client';

import * as React from 'react';
import SVG from 'react-inlinesvg';
import styles from '@/styles/Skills.module.scss';
import { Skill } from '@prisma/client';

export default function Skills({ data }: { data: Skill[] }) {
  return (
    <section id="skills-component" className={'relative mt-10 px-4 lg:px-0'}>
      <div className="mx-auto max-w-5xl">
        <h3 className="mb-2 font-header text-3xl font-light leading-tight tracking-wide lg:text-4xl">
          What I&apos;m <span className="overlay-color">good</span> at...
        </h3>
        <div id="skills-list">
          {data
            ? data.map((skill: Skill, index: number) => (
                <div key={`skill-${index}`} className="mt-1 flex items-center gap-5">
                  <span className="flex-none font-mono font-medium">{skill.name}</span>
                  <span className="dashed-border-t w-full shrink"></span>
                  <SVG title={skill.name} className={'w-8 flex-none fill-primary-700 dark:fill-primary-200'} src={`/images/svg-icons/${skill.logo}`} />
                  <div className="w-6/12 flex-none md:w-9/12">
                    <div className="h-4 w-full rounded bg-primary-200 dark:bg-primary-700">
                      <div className={`${styles[`bar-${skill.type}`]} h-4 rounded`} style={{ width: skill.percentage + '%' }}></div>
                    </div>
                  </div>
                </div>
              ))
            : [
                ...Array(6)
                  .fill('')
                  .map((_, idx) => 0 + idx),
              ].map((x) => (
                <div key={`skill-${x}`} className="mt-1 flex items-center gap-5">
                  <span className="flex-none font-medium">
                    <div key={x} className="h-6 w-12 animate-pulse rounded bg-primary-300 dark:bg-primary-600"></div>
                  </span>
                  <span className="dashed-border-t w-full shrink"></span>
                  <div key={x} className="h-8 w-8 flex-none animate-pulse rounded-full bg-primary-300 dark:bg-primary-600"></div>
                  <div className="w-6/12 flex-none md:w-9/12">
                    <div className="h-4 w-full animate-pulse rounded bg-primary-200 dark:bg-primary-700">
                      <div className={`${styles['bar-node']} h-4 rounded`} style={{ width: x * 10 + '%' }}></div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
