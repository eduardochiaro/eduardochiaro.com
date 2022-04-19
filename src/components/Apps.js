import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import GitHubIcon from '../elements/icons/github';
import styles from '../styles/Apps.module.scss'
import useStaleSWR from '../lib/staleSWR';
import NaturalImage from '../elements/NaturalImage';

export default function Apps () {

  const [dataDisplay, setDataDisplay] = useState(0);
  
  const { data, error } = useStaleSWR('/api/portfolio/apps');

  const previous = () => {
    if (dataDisplay <= 0) {
      setDataDisplay(data.results.length - 1);
    } else {
      setDataDisplay(dataDisplay - 1);
    }
  }
  const next = () => {
    if (dataDisplay >= data.results.length - 1 ) {
      setDataDisplay(0);
    } else {
      setDataDisplay(dataDisplay + 1);
    }
  }
  if (data && data.results) {
    return (
      <section className={`${styles.apps} px-8 lg:px-0 my-10`}>
        <span className="anchor" name="apps"/>
        <div className="max-w-5xl mx-auto relative">
          <div className="flex">
            <div className="grow-0 flex items-center cursor-pointer" onClick={previous}>
              <ChevronLeftIcon className={`text-gray-300 w-8 lg:w-full h-20 hover:text-gray-700`}/>
            </div>
            <div className="grow">
            { data?.results.map((app, index) => (
              <div className={`flex flex-wrap transition-all duration-500 ease-in-out ${index == dataDisplay ? 'opacity-100 h-auto' : 'opacity-0 h-0'}`} key={`apps-carousel-card-${index}`} >
                <div className={`basis-full md:basis-2/3 pt-6 relative ${index == dataDisplay ? 'block' : 'hidden'}`}>
                  <NaturalImage
                    src={`/uploads/${app.image}`}
                    size={1329}
                    alt={app.title}
                    title={app.title}
                  />
                </div>
                <div className={`basis-full md:basis-1/3 text-center ${index == dataDisplay ? 'block' : 'hidden'} px-8`}>
                  <h3 className="mt-10 text-4xl text-white font-header">{app.name}</h3>
                  <h4 className="text-2xl text-white">{app.description}</h4>
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-gray-700 transition text-white hover:text-terra-cotta-500 shadow-lg border border-gray-300 px-4 py-2 text-base rounded-md mt-8 lg:mt-24 mb-8 inline-block"
                  >
                    <GitHubIcon className="inline-block align-text-top w-5 mr-2" />
                    Download from GitHub
                  </a>
                </div>
              </div>
              
            ))}
            </div>
            <div className="grow-0 flex items-center cursor-pointer" onClick={next}>
              <ChevronRightIcon className={`text-gray-300 w-8 lg:w-full h-20 hover:text-terra-cotta-700`}/>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (<></>);
  }
}