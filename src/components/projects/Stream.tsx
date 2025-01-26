'use client';

import Link from 'next/link';
import moment from 'moment';
import NaturalImage from '@/components/NaturalImage';
import Flickr from '@/components/icons/Flickr';
import Instagram from '@/components/icons/Instagram';
import Masonry from 'react-masonry-css';
import useStaleSWR from '@/utils/staleSWR';
import WireContainer from '../frontend/WireContainer';
import Card from '../frontend/Card';

export default function Stream() {
  const { data } = useStaleSWR('/api/portfolio/stream');
  const items = data?.results.map(function (item: any, id: number) {
    return (
      <WireContainer type="medium" key={id}>
        <Card className="!p-2 shadow">
          <Link href={item.permalink} target="_blank">
            <div className="relative">
              <NaturalImage size={500} src={item.image} alt={item.title} className="rounded" />
              {item.type === 'Flickr' && <Flickr className="text-primary-100 absolute right-2 bottom-2 w-8" alt={item.type} />}
              {item.type === 'Instagram' && <Instagram className="text-primary-100 absolute right-2 bottom-4 w-8" alt={item.type} />}
            </div>
            <div className="p-3">
              <div className="flex">
                <h4 className="font-header flex-1 text-xl tracking-wide">{item.title}</h4>
              </div>
              {item.published && <p className="text-right font-mono text-xs opacity-70">{moment(item.published).fromNow()}</p>}
            </div>
          </Link>
        </Card>
      </WireContainer>
    );
  });
  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    640: 1,
  };
  return (
    <Masonry breakpointCols={breakpointColumnsObj} className="flex w-auto gap-2" columnClassName="bg-clip-padding flex flex-col gap-2">
      {items}
    </Masonry>
  );
}
