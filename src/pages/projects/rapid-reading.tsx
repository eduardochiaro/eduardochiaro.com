import Head from 'next/head';
import Header from '@/components/frontend/Header';
import Share from '@/components/frontend/Share';
import Footer from '@/components/frontend/Footer';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SunIcon } from '@heroicons/react/24/solid';

const replacer = (match: any) => {
  const length = match.length < 6 ? match.length + 1 : match.length;
  const slicePoint = Math.floor(length / 2);
  const wordStart = match.slice(0, slicePoint);
  const wordEnd = match.slice(slicePoint);
  return `<span class="font-bold">${wordStart}</span><span>${wordEnd}</span>`;
};

function RapidReading() {
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');
  useEffect(() => {
    const returned = text.replace(/\S+/g, replacer).replace(/(?:\r\n|\r|\n)/g, '<br/>');
    setOutput(returned);
  }, [text]);
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Head>
        <title>Projects &gt; Rapid Reading | Eduardo Chiaro</title>
      </Head>
      <div className="mb-auto">
        <Header />
        <Share />
        <section className={'px-4 lg:px-0 mt-5'}>
          <div className="max-w-5xl mx-auto">
            <h1 className="font-header leading-tight tracking-wide text-2xl lg:text-3xl font-light">
              <Link href="/projects" className="hover:underline text-secondary-600 dark:text-secondary-600 font-semibold">
                Projects
              </Link>{' '}
              / Rapid Reading
            </h1>
            <div className="mt-8">
              <div className="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
                <span className="font-medium">Info:</span> This project works better on{' '}
                <span className="font-bold">
                  <SunIcon className="w-4 h-4 inline align-middle" /> Light mode
                </span>
              </div>
              <textarea className="mb-8 input-field" rows={8} onChange={(event) => setText(event.target.value)} value={text} />
            </div>
            <div className="antialiased" dangerouslySetInnerHTML={{ __html: output }}></div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default RapidReading;
