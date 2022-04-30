import * as React from 'react';
import Header from '../components/frontend/Header'
import Bio from '../components/frontend/Bio'
import Jobs from '../components/frontend/Jobs'
import Share from '../components/frontend/Share'
import Skills from '../components/frontend/Skills'
import GitHub from '../components/frontend/GitHub'
import Footer from '../components/frontend/Footer'
import Sidemenu from '../components/frontend/Sidemenu'

export default function Home() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="mb-auto">
        <Header />
        <Share />
        <Bio />
        <hr className="my-10 max-w-5xl mx-auto border-t border-dotted border-primary-600 dark:border-primary-800" />
        <Jobs />
        <Skills />
        <hr className="my-10 max-w-5xl mx-auto border-t border-dotted border-primary-600 dark:border-primary-800" />
        <GitHub />
      </div>
      <Sidemenu />
      <Footer />
    </div>
  )
}
