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
    <section id="work" className={`${styles.jobs} mt-5 px-0 sm:px-2 md:px-4`}>
      <div className="flex flex-wrap items-center justify-between container mx-auto">
        <div className="flex-1 basis-full lg:basis-1/4 xl:basis-1/6">
          <h3 className="font-header leading-tight text-2xl lg:text-4xl pr-4 font-light border-r-0 lg:border-r-4 border-green-sheen-500 mx-4 lg:mx-2">
            I&apos;ve <span className="text-terra-cotta-500">coded</span> for...
          </h3>
        </div>
        <div className="flex-1 basis-full lg:basis-3/4 xl:basis-5/6">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            { data?.results.map((job, index) => (
              <div className={`text-center mx-auto z-10 relative ${styles.imageJobContainer}`} key={`job-image-${index}`}>
                <Tooltip tooltipText={job.disclaimer}>
                  <div className="transition-all duration-500 ease-out hover:scale-110">
                  <Image
                    layout="intrinsic"
                    width={Math.round((130 / 100) * parseInt(job.style))}
                    height={100}
                    alt={job.name}
                    src={`/images/logos/${job.logo}`}
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
            ))}
            </div>
        </div>

      </div>
    </section>
  )
}