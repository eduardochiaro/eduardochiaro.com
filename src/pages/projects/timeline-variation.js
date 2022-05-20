import Head from 'next/head';
import Header from "../../components/frontend/Header";
import Share from '../../components/frontend/Share';
import Footer from "../../components/frontend/Footer";
import Link from 'next/link';
import cache from "memory-cache";
import { EvenTile, OddTile } from '../../components/projects/TimelineTile';

function Timeline({ episodes }) {

  return (
    <div className="flex flex-col h-screen justify-between">
      <Head>
        <title>Projects &gt; Timeline (variation) | Eduardo Chiaro</title>
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
              </Link> &gt; Timeline (variation)
            </h1>
            <div className="mt-8">
            { episodes?.map((episode, index) => 
              index % 2 === 0 ? <OddTile key={`episode-${index}`} episode={episode} maxCharacters={4} type="small"  /> : <EvenTile key={`episode-${index}`} episode={episode} maxCharacters={4} type="small"  />
            )}
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