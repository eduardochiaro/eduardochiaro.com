import * as React from 'react';
import Header from '../components/frontend/Header'
import Bio from '../components/frontend/Bio'
import Jobs from '../components/frontend/Jobs'
import Share from '../components/frontend/Share'
import Skills from '../components/frontend/Skills'
import GitHub from '../components/frontend/GitHub'
import Footer from '../components/frontend/Footer'
import Sidemenu from '../components/frontend/Sidemenu'
import LatestPosts from '../components/frontend/LatestPosts';

export default function Home() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="mb-auto">
        <Header />
        <Share />
        <Bio />
        <hr className="mt-10 max-w-5xl mx-auto border-t border-dotted border-primary-700 dark:border-primary-600" />
        <Jobs />
        <Skills />
        <hr className="mt-10 max-w-5xl mx-auto border-t border-dotted border-primary-700 dark:border-primary-600" />
        <LatestPosts />
        <GitHub />
      </div>
      <Sidemenu />
      <Footer />
    </div>
  )
}
