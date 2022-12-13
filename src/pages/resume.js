import Head from 'next/head';
import Header from '@/components/frontend/Header';
import Share from '@/components/frontend/Share';
import Footer from '@/components/frontend/Footer';
import useStaleSWR from '@/utils/staleSWR';
import SVG from 'react-inlinesvg';
import moment from 'moment';
import { ChevronDoubleRightIcon } from '@heroicons/react/20/solid';

export default function Resume() {
  const { data } = useStaleSWR('/api/portfolio/jobs');
  
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Head>
        <title>Projects | Eduardo Chiaro</title>
      </Head>
      <Header />
      <Share />
      <div className="grow">
        <section className={'px-4 lg:px-0 mt-10'}>
          <div className="max-w-3xl mx-auto">
            <h1 className="font-header leading-tight tracking-wide text-2xl lg:text-3xl font-light h-10">Resume</h1>
            <div className="mt-5 mx-auto">
              {data && data.results
              ? data.results.map((job, index) => (
                <div className="flex group" key={`job-image-${index}`}>
                  <div className="flex-none w-4 md:w-8 relative mx-2 mdmx-4">
                    <div className="mx-auto w-0.5 h-full bg-gradient-to-b group-odd:bg-gradient-to-t from-secondary-500 to-accent-500 group-last:h-2 group-first:mt-3 z-10"></div>
                    <span className="absolute top-2 left-1/2 transform -translate-x-1/2 rounded-full w-4 h-4 bg-primary-200 border-2 border-primary-800 z-20 group-first:bg-emerald-500 group-last:bg-red-500 group-last:w-6 group-last:h-6 group-first:w-6 group-first:h-6"></span>
                  </div>
                  <div className="pb-16 flex-1">
                    <div className="relative">
                      {job.logo && <SVG alt={job.logo} className={'absolute top-0 right-5 fill-primary-700 dark:fill-primary-200'} src={`/uploads/${job.logo}`} height={20} />}
                      <h3 className="text-3xl font-header break-words mb-2">{job.name}</h3>

                      <div className={`font-mono text-sm md:text-normal flex items-center gap-2 whitespace-nowrap mb-4`}>
                        {moment(job.startDate).format('MMMM YYYY')} <ChevronDoubleRightIcon className="h-5"/> {job.endDate ? moment(job.endDate).format('MMMM YYYY') : 'Now'}
                      </div>
                      {job.disclaimer && <div className="text-xs text-primary-700 dark:text-primary-200 mt-2">{job.disclaimer}</div>}
                      
                    </div>
                  </div>
                </div>
                ))
              : ''}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}