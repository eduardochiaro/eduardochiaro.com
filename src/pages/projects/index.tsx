import Head from 'next/head';
import Header from '@/components/frontend/Header';
import Share from '@/components/frontend/Share';
import ProjectsComponent from '@/components/frontend/Projects';
import Footer from '@/components/frontend/Footer';

export default function Projects() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Head>
        <title>Projects | Eduardo Chiaro</title>
      </Head>
      <Header />
      <Share />
      <div className="grow">
        <ProjectsComponent />
      </div>
      <Footer />
    </div>
  );
}