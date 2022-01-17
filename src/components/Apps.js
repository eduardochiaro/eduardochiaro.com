import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Particles from "react-tsparticles";
import useSWR from 'swr';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import GitHubIcon from '../elements/icons/github';
import styles from '../styles/Apps.module.scss'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Apps () {

  const [dataDisplay, setDataDisplay] = useState(0);
  const { data, error } = useSWR('/api/portfolio/apps', fetcher);

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
  return (
    <section id="apps" className={`${styles.apps} relative mt-8 shadow-xl`}>
      <span className={styles.anchor} id="apps-anchor"/>
      <Particles
        className={styles.background}
        canvasClassName={styles.particles}
        options={{
          autoPlay:	true,
          fpsLimit: 60,
          motion: {
            disable: false,
            reduce: {
              factor: 4,
              value: true
            }
          },
          particles: {
            links: {
              distance: 100,
              enable: true,
              color: {
                value: `${styles.powderblue}`
              },
            },
            color: {
              value: `${styles.powderblue}`
            },
            move: {
              enable: true
            },
            size: {
              value: 3
            }
          },
          detectRetina: true,
        }}
      />
      <div className="container mx-auto relative">
        {data && (
        <>
          <div className="flex">
            <div className="grow-0 flex items-center cursor-pointer" onClick={previous}>
              <ChevronLeftIcon className={`text-gray-300 w-8 md:w-full h-20 hover:text-gray-700`}/>
            </div>
            <div className="grow">
            { data?.results.map((app, index) => (
              <div className={`flex flex-wrap transition-all duration-500 ease-in-out ${index == dataDisplay ? 'opacity-100 h-auto' : 'opacity-0 h-0'}`} key={`apps-carousel-card-${index}`} >
                <div className={`basis-full md:basis-2/3 pt-6 relative ${index == dataDisplay ? 'block' : 'hidden'}`}>
                  <Image
                    src={app.image}
                    layout="intrinsic"
                    width={1329}
                    height={831}
                    alt={app.title}
                    title={app.title}
                  />
                </div>
                <div className={`basis-full md:basis-1/3 text-center ${index == dataDisplay ? 'block' : 'hidden'}`}>
                  <h3 className="mt-4 md:mt-20 text-4xl text-white">{app.name}</h3>
                  <h4 className="text-2xl text-white">{app.short}</h4>
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-gray-700 transition text-white hover:text-terra-cotta-900 shadow-lg border border-gray-300 px-4 py-2 text-2xl rounded-md mt-8 md:mt-24 mb-8 inline-block"
                  >
                    <GitHubIcon className="inline-block align-text-top w-7 mr-2" />
                    Download from GitHub
                  </a>
                </div>
              </div>
              
            ))}
            </div>
            <div className="grow-0 flex items-center cursor-pointer" onClick={next}>
              <ChevronRightIcon className={`text-gray-300 w-8 md:w-full h-20 hover:text-terra-cotta-700`}/>
            </div>
          </div>
        </>
        )}
      </div>
    </section>
  );
}