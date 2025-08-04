'use client';

import Link from 'next/link';
import Masonry from 'react-masonry-css';
import WireContainer from './WireContainer';
import { GitHubItem } from '@/actions/github';
import GitHubIcon from '@/components/icons/Github';
import Card from './Card';

const breakpointColumnsObj = {
  default: 2,
  1024: 2,
  640: 1,
};
type Props = {
  responseArray: GitHubItem[];
};

export default function GitHub({ responseArray }: Props) {
  return (
    <Masonry breakpointCols={breakpointColumnsObj} className="masonry-grid mt-5 flex w-auto gap-4" columnClassName="bg-clip-padding flex flex-col gap-4">
      {responseArray.map((repo) => (
        <WireContainer type="medium" key={`repo-${repo.id}`}>
          <Card className="small p-4 text-base">
            <div className={'basis-full md:basis-2/3'} data-cy="repo-card">
              <h3 className="font-header group-hover:text-secondary-600 dark:group-hover:text-secondary-600 text-xl tracking-wide transition-colors duration-300 ease-out">
                {repo.name}
              </h3>
              <p className="mt-2 font-sans text-sm">{repo.description}</p>
              <Link href={repo.url || '#'} target="_blank" rel="noreferrer" className="download-button mx-auto mt-6 flex items-center gap-4 !text-sm md:mx-0">
                <GitHubIcon className="w-4" />
                View on GitHub
              </Link>
            </div>
          </Card>
        </WireContainer>
      ))}
    </Masonry>
  );
}
