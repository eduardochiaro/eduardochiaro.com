'use client';

import Link from 'next/link';
import { EvenTile, OddTile } from '@/components/projects/TimelineTile';
import { useState } from 'react';

const Tile = ({ episodes, type }: { episodes: any[]; type: boolean }) => {
  if (type) {
    return (
      <div className="mt-5 w-2/3 mx-auto">
        {episodes?.map((episode, index) => <EvenTile key={`episode-${index}`} episode={episode} maxCharacters={6} type="large" />)}
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

export default function Timeline({ data }: { data: any }) {
  const [type, setType] = useState(true);

  return (
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
        <Tile type={type} episodes={data} />
      </div>
    </section>
  );
}
