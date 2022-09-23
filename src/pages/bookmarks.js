import Head from 'next/head';
import Bookmarks from '@/components/frontend/Bookmarks';
import Footer from '@/components/frontend/Footer';
import Header from '@/components/frontend/Header';
import Share from '@/components/frontend/Share';

export default function Projects() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Head>
        <title>Bookmarks | Eduardo Chiaro</title>
      </Head>
      <Header />
      <Share />
      <div className="grow">
        <Bookmarks />
      </div>
      <Footer />
    </div>
  )
}