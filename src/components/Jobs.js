import * as React from 'react';
import Image from 'next/image';
import {
  InformationCircleIcon
} from '@heroicons/react/outline';
import Tooltip from '../elements/Tooltip';
import styles from '../styles/Jobs.module.scss'
import useStaleSWR from '../lib/staleSWR';

export default function Jobs () {
  const { data, error } = useStaleSWR('/api/portfolio/works');

  return (
    <section id="work" className={`${styles.jobs} px-8 lg:px-0 my-10`}>
      <div className="max-w-5xl mx-auto">
        <h3 className="font-header leading-tight text-2xl lg:text-3xl pr-4 font-light">
          I&apos;ve <span className="text-isabelline-700">coded</span> for...
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 mt-4">
          { data && data.results ? 
            data.results.map((job, index) => (
              <div className={`text-center mx-auto z-10 bg-white rounded relative ${styles.imageJobContainer}`} key={`job-image-${index}`}>
                <Tooltip tooltipText={job.disclaimer}>
                  <div className="transition-all duration-500 ease-out hover:scale-125">
                    <Image
                      layout="intrinsic"
                      width={Math.round((130 / 100) * parseInt(job.style))}
                      height={100}
                      alt={job.name}
                      src={`/uploads/${job.logo}`}
                      title={job.disclaimer}
                      />
                  </div>

                  {job.disclaimer && (
                    <>
                    <InformationCircleIcon className="hidden md:block w-4 text-terra-cotta-500 absolute bottom-0 right-0" aria-hidden="true" />
                    <div className="block md:hidden text-gray-500">
                      {job.disclaimer}
                    </div>
                    </>
                  )}
                </Tooltip>
                
              </div>
            )) : [
                ...Array(6)
                  .fill()
                  .map((_, idx) => 0 + idx),
              ].map((x) => (
                <div key={x} className="w-auto mx-5 h-14 bg-green-sheen-300 rounded-md animate-pulse"></div>
              ))
          }
          </div>
      </div>
    </section>
  )
}