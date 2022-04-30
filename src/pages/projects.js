import Head from 'next/head';
import Apps from "../components/frontend/Apps";
import Footer from "../components/frontend/Footer";
import Header from "../components/frontend/Header";

export default function Projects() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Head>
        <title>Eduardo Chiaro | Projects</title>
      </Head>
      <div className="mb-auto">
        <Header />
        <Apps />
      </div>
      <Footer />
    </div>
  )
}