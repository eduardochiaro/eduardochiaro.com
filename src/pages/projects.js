import Head from 'next/head';
import Apps from "../components/frontend/Apps";
import Footer from "../components/frontend/Footer";
import Header from "../components/frontend/Header";

export default function Projects() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Head>
        <title>Eduardo Chiaro | Projects</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Eduardo Chiaro - Software Developer" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      </Head>
      <div className="mb-auto">
        <Header />
        <Apps />
      </div>
      <Footer />
    </div>
  )
}