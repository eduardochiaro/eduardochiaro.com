import Head from 'next/head';
import Apps from "../components/Apps";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Top from "../components/Top";

export default function Projects() {
  return (
    <div>
      <Head>
        <title>Eduardo Chiaro | Projects</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Eduardo Chiaro - Software Developer" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      </Head>
      <Header />
      <Apps />
      <Top />
      <Footer />
    </div>
  )
}