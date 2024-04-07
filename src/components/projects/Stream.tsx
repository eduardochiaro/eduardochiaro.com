'use client';

import Link from 'next/link';
import moment from 'moment';
import NaturalImage from '@/components/NaturalImage';
import Flickr from '@/components/icons/Flickr';
import Instagram from '@/components/icons/Instagram';
import Masonry from 'react-masonry-css';
import useStaleSWR from '@/utils/staleSWR';

export default function Stream() {
  const { data } = useStaleSWR('/api/portfolio/stream');
  const items = data?.results.map(function (item: any, id: number) {
    return (
      <div key={id} className="box-card p-1 shadow">
        <Link href={item.permalink} target="_blank">
          <div className="relative">
            <NaturalImage size={500} src={item.image} alt={item.title} className="rounded" />
            {item.type === 'Flickr' && <Flickr className="absolute bottom-2 right-2 w-8 text-primary-100" alt={item.type} />}
            {item.type === 'Instagram' && <Instagram className="absolute bottom-4 right-2 w-8 text-primary-100" alt={item.type} />}
          </div>
          <div className="p-3">
            <div className="flex">
              <h4 className="flex-1 font-header text-xl tracking-wide">{item.title}</h4>
            </div>
            {item.published && <p className="text-right font-mono text-xs opacity-70">{moment(item.published).fromNow()}</p>}
          </div>
        </Link>
      </div>
    );
  });
  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    640: 1,
  };
  return (
    <Masonry breakpointCols={breakpointColumnsObj} className="flex w-auto gap-8" columnClassName="bg-clip-padding flex flex-col gap-8">
      {items}
    </Masonry>
  );
}
