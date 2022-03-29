import Header from '../components/Header'
import Bio from '../components/Bio'
import Jobs from '../components/Jobs'
import Share from '../components/Share'
import Skills from '../components/Skills'
import Top from '../components/Top'
import Apps from '../components/Apps'
import GitHub from '../components/GitHub'
import Footer from '../components/Footer'
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Eduardo Chiaro</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Eduardo Chiaro - Software Developer" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      </Head>
      <Header />
      <Bio />
      <Jobs />
      <Share />
      <Skills />
      <Apps />
      <GitHub />
      <Top />
      <Footer />
    </div>
  )
}
