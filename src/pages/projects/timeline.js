import Head from 'next/head';
import Header from "../../components/frontend/Header";
import Share from '../../components/frontend/Share';
import Footer from "../../components/frontend/Footer";
import Link from 'next/link';
import { EvenTile } from '../../components/projects/TimelineTile';
import fsCache from '../../utils/fsCache';

function Timeline({ episodes }) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Head>
        <title>Projects &gt; Timeline | Eduardo Chiaro</title>
      </Head>
      <Header />
      <Share />
      <div className="grow">
        <section className={`px-4 lg:px-0 mt-10`}>
          <div className="max-w-5xl mx-auto">
            <h1 className="font-header leading-tight text-2xl lg:text-3xl font-light">
              <Link
                href="/projects"
                >
                <a className="hover:underline text-primary-700 dark:text-primary-600 font-semibold">Projects</a>
              </Link> / Timeline
            </h1>
            <div className="mt-5 w-2/3 mx-auto">
            { episodes?.map((episode, index) => (
              <EvenTile key={`episode-${index}`} episode={episode} maxCharacters={6} type="full" />
            ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export async function getServerSideProps() {
  const hours = 24;
  const url = 'https://rickandmortyapi.com/api/episode';
  const episodes = await fsCache(url, hours, async () => {
    console.log('inside cache');
    const res = await fetch(url);
    const pageEpisodes = await res.json();

    return await Promise.all(pageEpisodes.results.map( async (episode) => {
      const characters = episode.characters.map(y => y.replace('https://rickandmortyapi.com/api/character/', ''));
      const res = await fetch(`https://rickandmortyapi.com/api/character/${characters.join(',')}`);
      episode.characters = await res.json();
      episode.characters = episode.characters.map(character => {
        return {
          id: character.id,
          name: character.name,
          image: character.image,
          species: character.species
        }
      });
      episode.characters_count = episode.characters.length;
      return episode;
    }));
  });

  return {
    props: { episodes },
  }
}

export default Timeline;