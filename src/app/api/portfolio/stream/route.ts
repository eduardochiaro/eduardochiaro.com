import { NextRequest, NextResponse } from 'next/server';
import { getCachedFlickr, getCacheInstagram } from '@/utils/getCachedFeeds';
import moment from 'moment';

type StreamItem = {
  title: string;
  permalink: string;
  published: moment.MomentInput;
  timestamp: number;
  type: string;
  image: string;
};

export async function GET(request: NextRequest, response: NextResponse) {
  let results: StreamItem[] = [];

  const flickr = await getCachedFlickr();
  flickr.items.slice(0, 5).forEach((item: { title: any; link: any; created: number; images: { [x: string]: { [x: string]: any } }[] }) => {
    results.push({
      title: item.title,
      permalink: item.link[0]['href'],
      published: moment(item.created).utc().format(),
      timestamp: moment(item.created).unix(),
      type: 'Flickr',
      image: item.link[1]['href'],
    });
  });

  const instagramImages = await getCacheInstagram();
  instagramImages.slice(0, 5).forEach((item: { caption: any; id: any; permalink: any; timestamp: moment.MomentInput; thumbnailUrl: any; mediaUrl: any }) => {
    results.push({
      title: item.caption || item.id,
      permalink: item.permalink,
      published: moment(item.timestamp).utc().format(),
      timestamp: moment(item.timestamp).unix(),
      type: 'Instagram',
      image: item.thumbnailUrl || item.mediaUrl,
    });
  });

  results = results.sort(function (x, y) {
    return y.timestamp - x.timestamp;
  });

  if (results) {
    return NextResponse.json({ results });
  }
  return new Response(null, {
    status: 400,
  });
}
