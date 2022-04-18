import * as React from 'react';
import useStaleSWR from '../lib/staleSWR';
import styles from '../styles/Skills.module.scss'
import SVG from 'react-inlinesvg';

export default function Skills () {
  const { data, error } = useStaleSWR('/api/portfolio/skills');

  return (
    <section className={`px-8 lg:px-0 my-10`}>
      <span className="anchor" name="skills"/>
      <div className="max-w-5xl mx-auto">
        <h3 className="font-header leading-tight text-2xl lg:text-3xl pr-4 font-light mb-2">
          What I&apos;m <span className="text-isabelline-700">good</span> at...
        </h3>
        <div>
        { data && data.results ? 
            data.results.map((skill, index) => (
            <div className="flex items-center mt-1">
              <span className="flex-none font-medium text-gray-1000 dark:text-gray-100 mr-5">{skill.name}</span>
              <span className="w-full border-t border-isabelline-600 dark:border-isabelline-800 border-dashed shrink mr-5"></span>
              <div className="flex-none relative text-white">
                <SVG title="Eduardo Chiaro" alt="Eduardo Chiaro" className={`inline-block h-8 w-8 fill-zinc-700 dark:fill-zinc-200`} src={`/images/svg-icons/${skill.logo}`} />
              </div>
              <div className="flex-none w-6/12">
                <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-4">
                  <div className={`${styles[`bar-${skill.type}`]} bg-blue-600 h-4`} style={{width: skill.percentage + '%'}}></div>
                </div>
              </div>
            </div>
          )) : '' }
        </div>
      </div>
    </section>
  );
}