import Head from 'next/head';
import Footer from "../../components/frontend/Footer";
import Header from "../../components/frontend/Header";
import Share from '../../components/frontend/Share';
import Masonry from 'react-masonry-css';
import useStaleSWR from '../../lib/staleSWR';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
import Flickr from '../../components/icons/flickr';

export default function Projects() {
  const { data, error } = useStaleSWR('/api/portfolio/stream');
  // Convert array to JSX items
  const items = data?.results.map(function(item, id) {
    return <div key={id} className="shadow box-card p-1">
      <Link
      href={item.permalink}
        >
          <a target="_blank">
            <img
              src={item.image}
              alt={item.title}
              className="w-auto rounded"
              />
            <div className="p-3">
              <div className="flex">
              <h4 className="flex-1 font-header tracking-wide text-xl">{item.title}</h4>
              <Flickr className="w-8 " alt={item.type} />
              </div>
              <p className="text-right text-sm opacity-70">{moment(item.published).fromNow()}</p>
            </div>
          </a>
        </Link>
      </div>
  });
  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    640: 1
  };
  return (
    <div className="flex flex-col h-screen justify-between">
      <Head>
        <title>Eduardo Chiaro | Projects &lraq; Stream</title>
      </Head>
      <div className="mb-auto">
        <Header />
        <Share />
        <section className={`px-4 lg:px-0 mt-10`}>
          <div className="max-w-5xl mx-auto">
            <h3 className="font-header leading-tight text-2xl lg:text-3xl pr-4 font-light">
              Stream
            </h3>
            <div className="mt-8">
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex gap-8 w-auto"
                columnClassName="bg-clip-padding flex flex-col gap-8">
                  {items }
                
              </Masonry>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}