import React, { useState } from 'react';
import Head from 'next/head'
import Header from '../components/Header'
import Bio from '../components/Bio'
import Jobs from '../components/Jobs'
import Share from '../components/Share'
import Skills from '../components/Skills'
import GitHub from '../components/GitHub'
import Footer from '../components/Footer'
import Sidemenu from '../components/Sidemenu'

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
        <Bio />
        <Share />
        <hr className="my-10 max-w-5xl mx-auto border-t border-dotted border-isabelline-600 dark:border-isabelline-800" />
        <Jobs />
        <Skills />
        <hr className="my-10 max-w-5xl mx-auto border-t border-dotted border-isabelline-600 dark:border-isabelline-800" />
        <GitHub />
      </div>
      <Sidemenu />
      <Footer />
    </div>
  )
}
