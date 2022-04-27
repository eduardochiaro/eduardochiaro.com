import React, { useState } from 'react';
import Head from 'next/head'
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
      <Head>
        <title>Eduardo Chiaro</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Eduardo Chiaro - Software Developer" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      </Head>
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
