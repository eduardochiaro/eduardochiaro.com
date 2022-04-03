import * as React from 'react';
import useSWR from 'swr';
import SVG from 'react-inlinesvg'
import { kebab } from 'case'
import GitHubIcon from '../elements/icons/github'
import { TagIcon } from '@heroicons/react/solid';
import styles from '../styles/GitHub.module.scss'
import moment from 'moment';
import Image from 'next/image';

const fetcher = (url) => fetch(url).then((res) => res.json())

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default function GitHub () {

  const { data, error } = useSWR('/api/portfolio/github', fetcher);

  const cutReposene = (data) ? data.results.slice(0, 7) : [];

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
          className="z-10"
          alt={alt}
        />
    ) : (
      <Image
          src={src}
          layout="fill"
          objectFit="cover"
          className="z-10"
          alt={alt}
        />
    )
  }

  return (
    <section id="github" className={`${styles.github} pb-12  px-0 sm:px-2 md:px-4`}>
      <span className="anchor" name="github"/>
      <div className="container mx-auto pt-8">
        <h3 className="font-header leading-tight text-2xl lg:text-4xl font-light mx-4 lg:mx-2 mb-2">
          Latest repositories{' '}<span className="rounded font-base align-super bg-terra-cotta-500 text-white px-2 py-1 text-sm">{ data ? data.results.length : 0 } total</span>
        </h3>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                        <div className="p-1 shadow-sm inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: language.color }}></div>
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
      </div>
    </section>
  )
}