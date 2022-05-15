import Head from 'next/head';
import Header from "../../components/frontend/Header";
import Share from '../../components/frontend/Share';
import Footer from "../../components/frontend/Footer";
import NaturalImage from "../../components/NaturalImage";
import Link from 'next/link';
import cache from "memory-cache";
import moment from 'moment';

function Timeline({ episodes }) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Head>
        <title>Projects &gt; Timeline | Eduardo Chiaro</title>
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
              </Link> &gt; Timeline
            </h1>
            <div className="mt-8">
            { episodes?.map((episode, index) => (
              <div key={`timeline-${index}`} className="flex group">
                <div className="flex-none w-12 md:w-24 font-mono text-right">
                  <span className="text-xl md:text-3xl block">{ moment(episode.air_date).format('DD')}</span>
                  <span className="text-sm md:text-normal">{ moment(episode.air_date).format('MMM \'YY')}</span>
                </div>
                <div className="flex-none w-4 md:w-8 relative mx-2 mdmx-4">
                  <div className="mx-auto w-0.5 h-full bg-gradient-to-b group-even:bg-gradient-to-t from-primary-500 to-accent-500 group-last:h-2 group-first:mt-3 z-10"></div>
                  <span className="absolute top-2 left-1/2 transform -translate-x-1/2  rounded-full w-4 h-4 bg-zinc-200 border-2 border-zinc-800 z-20 group-first:bg-emerald-500 group-last:bg-red-500"></span>
                </div>
                <div className="pb-16 grow pl-1">
                  <div className="box-card p-4">
                    <h3 className="text-3xl font-header">{ episode.name }</h3>
                    <p className="font-mono">{episode.episode}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {episode.characters.slice(0, 6).map((y, index) => (
                      <div key={`character-${index}`} className="flex items-center">
                        <NaturalImage
                          layout="fixed"
                          size={50}
                          src={y.image}
                          className="rounded-full"
                        />
                        <div className="pl-4">
                          <h4 className="text-sm">{y.name}</h4>
                          <p className="text-xs">{y.species}</p>
                        </div>
                      </div>
                    ))}
                    { episode.characters_count > 6 && (
                    <div className="flex items-center">
                      <p className="text-xs">and {episode.characters_count - 6} more characters</p>
                    </div>
                    )}
                    </div>
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const hours = 24;
  const url = 'https://rickandmortyapi.com/api/episode';
  const cachedResponse = cache.get(url);
  if (cachedResponse) {
    return {
      props: { episodes: cachedResponse  },
    }
  }
  const res = await fetch(url);
  const pageEpisodes = await res.json();

  const episodes = await Promise.all(pageEpisodes.results.map( async (episode) => {
    const characters = episode.characters.map(y => y.replace('https://rickandmortyapi.com/api/character/', ''));
    const res = await fetch(`https://rickandmortyapi.com/api/character/${characters.join(',')}`);
    episode.characters = await res.json();
    episode.characters_count = episode.characters.length;
    return episode;
  }));
  cache.put(url, episodes, hours * 1000 * 60 * 60);
  return {
    props: { episodes },
  }
}

export default Timeline;