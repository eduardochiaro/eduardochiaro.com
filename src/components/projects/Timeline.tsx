'use client';

import Link from 'next/link';
import { EvenTile, OddTile } from '@/components/projects/TimelineTile';
import { useState } from 'react';
import WireContainer from '../frontend/WireContainer';
import Card from '../frontend/Card';

const Tile = ({ episodes, type }: { episodes: any[]; type: boolean }) => {
  if (type) {
    return (
      <div className="mx-auto mt-5 w-2/3">
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
    <section className={'mt-10 px-4 lg:px-0'}>
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="font-header col-span-2 text-3xl leading-tight font-light tracking-wide lg:text-4xl">
            <Link href="/projects" className="text-secondary-600 dark:text-secondary-600 font-semibold hover:underline">
              Projects
            </Link>{' '}
            / Lab / Timeline {type ? '' : '(variation)'}
          </h1>
          <div className="hidden justify-end md:flex">
            <WireContainer type="small">
              <Card type="small" className="flex items-center gap-2 !p-2">
                <span className="ml-3 text-sm font-medium">2 Sides</span>
                <label htmlFor="toggle-example" className="relative flex cursor-pointer items-center">
                  <input type="checkbox" id="toggle-example" className="sr-only" onChange={() => setType(!type)} />
                  <div className="toggle-bg"></div>
                </label>
              </Card>
            </WireContainer>
          </div>
        </div>
        <Tile type={type} episodes={data} />
      </div>
    </section>
  );
}
