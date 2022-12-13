import Head from 'next/head';
import Header from '@/components/frontend/Header';
import Share from '@/components/frontend/Share';
import Footer from '@/components/frontend/Footer';
import useStaleSWR from '@/utils/staleSWR';
import SVG from 'react-inlinesvg';
import moment from 'moment';

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
            <h1 className="font-header leading-tight tracking-wide text-2xl lg:text-3xl font-light h-10">CV</h1>
            {data && data.results
            ? data.results.map((job, index) => (
                <div className={'mb-5 relative align-middle'} key={`job-image-${index}`}>
                  <SVG alt={job.name} className={'inline fill-primary-700 dark:fill-primary-200'} src={`/uploads/${job.logo}`} height={30} />
                  <h3>{job.name}</h3>
                  <p>from {moment(job.startDate).format('MMMM YYYY')} to {job.endDate ? moment(job.endDate).format('MMMM YYYY') : 'Now'}</p>
                  {job.disclaimer && <div className="text-xs text-primary-700 dark:text-primary-200 mt-2">{job.disclaimer}</div>}
                </div>
              ))
            : ''}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
