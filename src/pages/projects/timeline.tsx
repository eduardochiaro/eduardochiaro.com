import Link from 'next/link';
import { EvenTile, OddTile } from '@/components/projects/TimelineTile';
import FrontendLayout from '@/components/layouts/Frontend';
import { useState } from 'react';

const TimelineComponent = ({ episodes, type }: { episodes: any[]; type: boolean }) => {
  if (type) {
    return (
      <div className="mt-5 w-2/3 mx-auto">
        {episodes?.map((episode, index) => (
          <EvenTile key={`episode-${index}`} episode={episode} maxCharacters={6} type="large" />
        ))}
      </div>
    );
  } else {
    return (
      <div className="mt-5">
        {episodes?.map((episode, index) =>
          index % 2 === 0 ? (
            <OddTile key={`episode-${index}`} episode={episode} maxCharacters={4} type="small" />
          ) : (
            <EvenTile key={`episode-${index}`} episode={episode} maxCharacters={4} type="small" />
          ),
        )}
      </div>
    );
  }
};

function Timeline({ episodes }: { episodes: any[] }) {
  const [type, setType] = useState(true);
  return (
    <FrontendLayout title="Projects &gt; Timeline | Eduardo Chiaro">
      <section className={'px-4 lg:px-0 mt-10'}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3">
            <h1 className="font-header leading-tight tracking-wide text-3xl lg:text-4xl font-light col-span-2">
              <Link href="/projects" className="hover:underline text-secondary-600 dark:text-secondary-600 font-semibold">
                Projects
              </Link>{' '}
              / Timeline {type ? '' : '(variation)'}
            </h1>
            <div className="hidden md:flex justify-end ">
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
    </FrontendLayout>
  );
}

export async function getStaticProps() {
  const url = 'https://rickandmortyapi.com/api/episode';
  const res = await fetch(url);
  const pageEpisodes = await res.json();
  const episodes = await Promise.all(
    pageEpisodes.results.map(async (episode: any) => {
      const characters = episode.characters.map((y: string) => y.replace('https://rickandmortyapi.com/api/character/', ''));
      const res = await fetch(`https://rickandmortyapi.com/api/character/${characters.join(',')}`);
      episode.characters = await res.json();
      episode.characters = episode.characters.map((character: any) => {
        return {
          id: character.id,
          name: character.name,
          image: character.image,
          species: character.species,
        };
      });
      episode.characters_count = episode.characters.length;
      return episode;
    }),
  );

  return {
    props: { episodes },
    revalidate: 84600,
  };
}

export default Timeline;
