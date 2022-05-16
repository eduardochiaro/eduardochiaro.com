import Head from 'next/head';
import Footer from "../../components/frontend/Footer";
import Header from "../../components/frontend/Header";
import Share from '../../components/frontend/Share';
import Masonry from 'react-masonry-css';
import useStaleSWR from '../../utils/staleSWR';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
import Flickr from '../../components/icons/flickr';
import Instagram from '../../components/icons/instagram';
import styles from '../../styles/Stream.module.scss';
import NaturalImage from '../../components/NaturalImage';

export default function Projects() {
  const { data } = useStaleSWR('/api/portfolio/stream');
  const items = data?.results.map(function(item, id) {
    return <div key={id} className="shadow box-card p-1">
      <Link
      href={item.permalink}
        >
          <a target="_blank">
            <div className="relative">
              <NaturalImage
                src={item.image}
                alt={item.title}
                size={500}
                className="rounded"
              />
              {item.type === "Flickr" && <Flickr className="w-8 absolute bottom-2 right-2 text-zinc-100" alt={item.type} />}
              {item.type === "Instagram" && <Instagram className="w-8 absolute bottom-4 right-2 text-zinc-100" alt={item.type} />}
              
            </div>
            <div className="p-3">
              <div className="flex">
              <h4 className="flex-1 font-header tracking-wide text-xl">{item.title}</h4>
              </div>
              <p className="text-right text-xs font-mono opacity-70">{moment(item.published).fromNow()}</p>
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
        <title>Projects &gt; Stream | Eduardo Chiaro</title>
      </Head>
      <div className={`${styles.stream} mb-auto pb-10`}>
        <Header />
        <Share />
        <section className={`px-4 lg:px-0 mt-10`}>
          <div className="max-w-5xl mx-auto">
            <h1 className="font-header leading-tight text-2xl lg:text-3xl font-light">
              <Link
                href="/projects"
                >
                <a className="hover:underline">Projects</a>
              </Link> &gt; Stream
            </h1>
            <div className="mt-8">
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex gap-8 w-auto"
                columnClassName="bg-clip-padding flex flex-col gap-8">
                  { items }
              </Masonry>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}