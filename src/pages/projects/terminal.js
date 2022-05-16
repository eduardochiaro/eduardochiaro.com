import Head from 'next/head';
import Header from "../../components/frontend/Header";
import Share from '../../components/frontend/Share';
import Footer from "../../components/frontend/Footer";
import Link from 'next/link';
import TerminalComponent from '../../components/projects/Terminal';


function Terminal() {

  return (
    <div className="flex flex-col h-screen justify-between">
      <Head>
        <title>Projects &gt; Terminal | Eduardo Chiaro</title>
      </Head>
      <div className="mb-auto">
        <Header />
        <Share />
        <section className={`px-4 lg:px-0 mt-10`}>
          <div className="max-w-5xl mx-auto">
            <h1 className="font-header leading-tight text-2xl lg:text-3xl font-light">
              <Link
                href="/projects"
                >
                <a className="hover:underline">Projects</a>
              </Link> &gt; Terminal
            </h1>
            <div className="mt-8">
              <TerminalComponent />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default Terminal;