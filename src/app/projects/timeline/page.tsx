import { Metadata } from "next";
import TimelineComponent from '@/components/projects/Timeline';
import FrontendLayout from '@/components/layouts/Frontend';

export const metadata: Metadata = {
  title: 'Projects > Timeline | Eduardo Chiaro',
}

export default async function Timeline() {
  const episodes = await getData();
  return (
    <FrontendLayout>
     <TimelineComponent data={episodes} />
    </FrontendLayout>
  );
}

async function getData() {
  const url = 'https://rickandmortyapi.com/api/episode';
  const res = await fetch(url, { next: { revalidate: 84600 } });
  const pageEpisodes = await res.json();
  const episodes = await Promise.all(
    pageEpisodes.results.map(async (episode: any) => {
      const characters = episode.characters.map((y: string) => y.replace('https://rickandmortyapi.com/api/character/', ''));
      const res = await fetch(`https://rickandmortyapi.com/api/character/${characters.join(',')}`, { next: { revalidate: 84600 } });
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

  return episodes;
}

