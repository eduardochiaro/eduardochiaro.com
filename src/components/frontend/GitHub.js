import * as React from 'react';
import useSWR from 'swr';
import SVG from 'react-inlinesvg'
import { kebab } from 'case'
import GitHubIcon from '../icons/github'
import { TagIcon } from '@heroicons/react/solid';
import styles from '../../styles/GitHub.module.scss'
import moment from 'moment';
import Image from 'next/image';

const fetcher = (url) => fetch(url).then((res) => res.json())

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default function GitHub () {

  const { data, error } = useSWR('/api/portfolio/github', fetcher);

  const cutReposene = (data) ? data.results.filter(x => !x.isArchived).slice(0, 6) : [];

  const getLanguageIcon = (language) => {
    switch (language) {
      case 'JavaScript':
        return 'js'
      case 'Swift':
        return 'swift'
      case 'TypeScript':
        return 'node'
      case 'CSS':
        return 'css'
      case 'SCSS':
      case 'CSS3':
        return 'css3'
      case 'PHP':
        return 'php'
      case 'Shell':
        return 'shell'
      default:
        return 'html'
    }
  }

  const LoadImage = ({ src, alt }) => {
    const pick = randomIntFromInterval(1,4);
  
    return src.includes('avatars.githubusercontent.com') ? (
      <Image
          src={`/images/random/${pick}.jpg`}
          layout="fill"
          objectFit="cover"
          className="z-10 rounded"
          alt={alt}
        />
    ) : (
      <Image
          src={src}
          layout="fill"
          objectFit="cover"
          className="z-10 rounded"
          alt={alt}
        />
    )
  }

  return (
    <section id="github" className={`${styles.github} px-8 lg:px-0 mt-10`}>
      <span className="anchor" name="github"/>
      <div className="max-w-5xl mx-auto">
        <h3 className="font-header leading-tight text-2xl lg:text-3xl pr-4 font-light">
          Latest repositories{' '}<span className="rounded font-base align-super text-isabelline-800 dark:text-isabelline-700 text-sm">({ data ? data.results.length : 0 } total)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 pb-10">
        { cutReposene.map((repo, index) => (
          <div className="flex relative rounded-lg shadow-xl bg-zinc-200 dark:bg-zinc-700 p-2" key={`repo-${index}`}>
            <a href={repo.url} className="flex flew-wrap w-full text-decoration-none">
              <div className="basis-1/3 p-4">
                <div className="relative w-full h-full">
                  <LoadImage src={repo.openGraphImageUrl} alt={repo.name} />
                </div>
              </div>
              <div className="basis-2/3 p-4">
                <h4>{repo.name}</h4>
                <p className="mt-4 mb-2 text-xs antialiased">{repo.description}</p>
                <p className="text-xs opacity-60 ">Last updated {moment(repo.pushedAt).from(moment())}</p>
                {repo.languages.slice(0, 1).map((language, index) => (
                  <div key={index} className="inline-block mr-4 text-xs antialiased">
                    <div className="p-1 drop-shadow inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: language.color }}></div>
                    {language.name}
                  </div>
                ))}
                <div className="mt-2">                
                {repo.topics.map((topic) => (
                  <div className="bg-white border shadow-sm border-gray-200 rounded px-2 text-sm text-gray-600 mr-2 mb-2 inline-block z-30" key={topic}>
                    <TagIcon className="w-3 inline mr-1 align-middle"/>{topic}
                  </div>
                ))}
                </div>

              </div>
              <SVG title={repo.language} alt={repo.language} className={`w-10 absolute right-4 bottom-2 fill-independence-200 dark:fill-zinc-500`} src={`images/svg-icons/${getLanguageIcon(repo.language)}.svg`} />
            </a>
          </div>
        ))}
        </div>
        {/*
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="text-center hidden md:block">
            <GitHubIcon className={`w-36 text-independence-900 mx-auto opacity-25 mt-8`} />
          </div>
          { cutReposene.map((repo, index) => (
            <a href={repo.url} key={`repo-${index}`} className="text-decoration-none" style={{perspective: '1000px'}}>
              <div className={`rounded bg-white shadow-xl shadow-independence-900/30 h-max m-4 overflow-hidden ${styles["card"]} transition-all duration-500`}>
                <div className="relative h-96 w-full">
                  <LoadImage src={repo.openGraphImageUrl} alt={repo.name} />
                  <div className={`absolute top-64 hover:top-16 z-30 w-full ${styles["card-holder"]} transition-all duration-500`}>
                    {repo.topics.map((topic) => (
                      <div className="bg-white border shadow-sm border-gray-200 rounded px-2 text-sm text-gray-600 ml-2 mb-2 inline-block z-30" key={topic}>
                        <TagIcon className="w-3 inline mr-1 align-middle"/>{topic}
                      </div>
                    ))}
                    <div className="inline-block w-1 h-6 mb-2 opacity-0">-</div>
                    <div className={`bg-egg-shell-400 h-96 ${styles["language-" + kebab(repo.language)]} ${styles["card-header"]}`} >
                      <SVG title={repo.language} alt={repo.language} className={`${styles.logo} w-14 mx-4 mt-6`} src={`images/svg-icons/${getLanguageIcon(repo.language)}.svg`} />
                      <h3 className="text-xl font-header pt-5 mx-4 text-ellipsis w-2/3 whitespace-nowrap overflow-hidden">{repo.name}</h3>
                      <p className="pb-5 mx-4 text-xs opacity-60 ">Last updated {moment(repo.updatedAt).from(moment())}</p>
                      <p className="w-2/3 mx-4 mt-4 mb-2 text-xs antialiased">{repo.description}</p>
                      {repo.languages.slice(0, 3).map((language, index) => (
                        <div key={index} className="inline-block mx-4 text-xs antialiased">
                          <div className="p-1 drop-shadow inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: language.color }}></div>
                          {language.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
        */}
      </div>
    </section>
  )
}