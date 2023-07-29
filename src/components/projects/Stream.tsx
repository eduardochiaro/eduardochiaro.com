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
      <div key={id} className="shadow box-card p-1">
        <Link href={item.permalink} target="_blank">
          <div className="relative">
            <NaturalImage size={500} src={item.image} alt={item.title} className="rounded" />
            {item.type === 'Flickr' && <Flickr className="w-8 absolute bottom-2 right-2 text-primary-100" alt={item.type} />}
            {item.type === 'Instagram' && <Instagram className="w-8 absolute bottom-4 right-2 text-primary-100" alt={item.type} />}
          </div>
          <div className="p-3">
            <div className="flex">
              <h4 className="flex-1 font-header tracking-wide text-xl">{item.title}</h4>
            </div>
            <p className="text-right text-xs font-mono opacity-70">{moment(item.published).fromNow()}</p>
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
    <Masonry breakpointCols={breakpointColumnsObj} className="flex gap-8 w-auto" columnClassName="bg-clip-padding flex flex-col gap-8">
      {items}
    </Masonry>
  );
}
