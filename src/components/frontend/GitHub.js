import * as React from 'react';
import useSWR from 'swr';
import SVG from 'react-inlinesvg'
import { TagIcon } from '@heroicons/react/solid';
import { ClockIcon } from '@heroicons/react/outline';
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
    <section id="github" className={`px-8 lg:px-0 mt-10`}>
      <span className="anchor" name="github"/>
      <div className="max-w-5xl mx-auto">
        <h3 className="font-header leading-tight text-2xl lg:text-3xl pr-4 font-light">
          Latest repositories{' '}<span className="rounded font-base align-super text-primary-800 dark:text-primary-700 text-sm">({ data ? data.results.length : 0 } total)</span>
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xl:gap-8 mt-5 pb-10">
        { cutReposene.map((repo, index) => (
          <div className="flex relative rounded-lg drop-shadow bg-zinc-200 dark:bg-zinc-700 p-2 transition hover:ring-4 ring-offset-4 ring-offset-zinc-50 dark:ring-offset-zinc-800 hover:ring-zinc-300 hover:dark:ring-zinc-600" key={`repo-${index}`}>
            <a href={repo.url} className="flex flew-wrap w-full text-decoration-none">
              <div className="hidden md:basis-1/3 p-4 pr-2">
                <div className="relative w-full h-full">
                  <LoadImage src={repo.openGraphImageUrl} alt={repo.name} />
                </div>
              </div>
              <div className="basis-full md:basis-2/3 p-4 relative">
                <h4 className="mt-2 text-lg font-bold font-header tracking-wide ">{repo.name}</h4>
                <p className="mt-4 mb-2 text-xs antialiased">{repo.description}</p>
                <p className="text-xs opacity-60 absolute top-2 right-2"><ClockIcon alt="last updated" className="inline-block h-4 align-middle"/> {moment(repo.pushedAt).from(moment())}</p>
                {repo.languages.slice(0, 2).map((language, index) => (
                  <div key={index} className="inline-block mr-4 text-xs antialiased">
                    <span className="inline-block w-3 h-3 align-middle mb-1 border border-zinc-500 dark:border-zinc-800 rounded-full mr-2" style={{ backgroundColor: language.color }}></span>
                    {language.name}
                  </div>
                ))}
                <div className="mt-2">                
                {repo.topics.map((topic) => (
                  <div className="bg-zinc-300 dark:bg-zinc-500 border border-zinc-400 dark:border-zinc-600 rounded px-2 text-sm mr-2 mb-2 inline-block z-30" key={topic}>
                    <TagIcon className="w-3 inline mr-1 align-middle"/>{topic}
                  </div>
                ))}
                </div>

              </div>
              <SVG title={repo.language} alt={repo.language} className={`w-10 absolute right-4 bottom-2 fill-zinc-200 dark:fill-zinc-500`} src={`images/svg-icons/${getLanguageIcon(repo.language)}.svg`} />
            </a>
          </div>
        ))}
        </div>
      </div>
    </section>
  )
}