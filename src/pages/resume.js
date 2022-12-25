import Head from 'next/head';
import Header from '@/components/frontend/Header';
import Share from '@/components/frontend/Share';
import Footer from '@/components/frontend/Footer';
import ResumeComponent from '@/components/frontend/Resume';
import useStaleSWR from '@/utils/staleSWR';

export default function Resume() {
  const { data } = useStaleSWR('/api/portfolio/resume');

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Head>
        <title>Resume | Eduardo Chiaro</title>
      </Head>
      <Header />
      <Share />
      <div className="grow">
        <ResumeComponent />
      </div>
      <Footer />
    </div>
  );
}
