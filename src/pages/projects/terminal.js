import Head from 'next/head';
import Header from '@/components/frontend/Header';
import Share from '@/components/frontend/Share';
import Footer from '@/components/frontend/Footer';
import Link from 'next/link';
import TerminalComponent from '@/components/projects/Terminal';

function Terminal() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Head>
        <title>Projects &gt; Terminal | Eduardo Chiaro</title>
      </Head>
      <Header />
      <Share />
      <div className="grow">
        <section className={'px-4 lg:px-0 mt-10 h-full'}>
          <div className="max-w-5xl mx-auto h-full">
            <h1 className="font-header leading-tight tracking-wide text-2xl lg:text-3xl font-light">
              <Link href="/projects" className="hover:underline text-secondary-600 dark:text-secondary-600 font-semibold">
                Projects
              </Link>{' '}
              / Terminal
            </h1>
            <div className="mt-5 h-2/3 grow">
              <TerminalComponent />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Terminal;
