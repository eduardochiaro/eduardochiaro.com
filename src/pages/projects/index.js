import Head from 'next/head';
import Apps from "../../components/frontend/Apps";
import Footer from "../../components/frontend/Footer";
import Header from "../../components/frontend/Header";
import Share from '../../components/frontend/Share';

export default function Projects() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Head>
        <title>Eduardo Chiaro | Projects</title>
      </Head>
      <div className="mb-auto">
        <Header />
        <Share />
        <Apps />
      </div>
      <Footer />
    </div>
  )
}