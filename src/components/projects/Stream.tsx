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
import Pixelfed from '../icons/Pixelfed';

const GetIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'Flickr':
      return <Flickr className="text-primary-100 w-6" alt={type} />;
    case 'Instagram':
      return <Instagram className="text-primary-100 w-6" alt={type} />;
    case 'Pixelfed':
      return <Pixelfed className="text-primary-100 w-6" alt={type} />;
    default:
      return <span className="text-sm font-semibold capitalize">{type}</span>;
  }
};

export default function Stream() {
  const { data } = useStaleSWR('/api/portfolio/stream');
  const items = data?.results.map(function (item: any, id: number) {
    return (
      <WireContainer type="medium" key={id}>
        <Card className="!p-2 shadow">
          <Link href={item.permalink} target="_blank">
            <div className="relative">
              <NaturalImage size={500} sizeType="w" src={item.image} alt={item.title} className="rounded" />
            </div>
            <div className="p-3">
              <div className="flex">
                <h4 className="font-header mb-1 flex-1 text-base tracking-wide">{item.title}</h4>
              </div>
              <div className="flex items-center justify-between">
                <GetIcon type={item.type} />
                {item.published && <p className="text-right font-mono text-xs opacity-70">{moment(item.published).fromNow()}</p>}
              </div>
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
