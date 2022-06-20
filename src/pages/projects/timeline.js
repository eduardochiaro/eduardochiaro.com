import Head from 'next/head';
import Header from "../../components/frontend/Header";
import Share from '../../components/frontend/Share';
import Footer from "../../components/frontend/Footer";
import Link from 'next/link';
import { EvenTile, OddTile } from '../../components/projects/TimelineTile';
import { useState } from 'react';

const TimelineComponent = ({ episodes, type }) => {
  if (type) {
    return (
      <div className="mt-5 w-2/3 mx-auto">
      { episodes?.map((episode, index) => (
        <EvenTile key={`episode-${index}`} episode={episode} maxCharacters={6} type="full" />
      ))}
      </div>
    );
  } else {
    return (
      <div className="mt-5">
      { episodes?.map((episode, index) => 
        index % 2 === 0 ? <OddTile key={`episode-${index}`} episode={episode} maxCharacters={4} type="small"  /> : <EvenTile key={`episode-${index}`} episode={episode} maxCharacters={4} type="small"  />
      )}
      </div>
    )
  }
}

function Timeline({ episodes }) {
  const [type, setType] = useState(true);
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
            <div className="grid grid-cols-3">
              <h1 className="font-header leading-tight text-2xl lg:text-3xl font-light col-span-2">
                <Link
                  href="/projects"
                  >
                  <a className="hover:underline text-primary-700 dark:text-primary-600 font-semibold">Projects</a>
                </Link> / Timeline {type ? '' : '(variation)'}
              </h1>
              <div className="flex justify-end">
                <label htmlFor="toggle-example" className="flex items-center cursor-pointer relative mb-4">
                  <input type="checkbox" id="toggle-example" className="sr-only" onChange={() => setType(!type)} />
                  <div className="toggle-bg"></div>
                  <span className="ml-3 text-sm font-medium">View variation</span>
                </label>
              </div>
            </div>
            <TimelineComponent type={type} episodes={episodes} />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const url = 'https://rickandmortyapi.com/api/episode';
  const res = await fetch(url);
  const pageEpisodes = await res.json();
  const episodes = await Promise.all(pageEpisodes.results.map( async (episode) => {
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

  return {
    props: { episodes },
    revalidate: 84600
  }
}

export default Timeline;