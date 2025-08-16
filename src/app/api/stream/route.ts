import { NextRequest, NextResponse } from 'next/server';
import { getCachedFlickr, getCacheInstagram, getCachePixelfed } from '@/utils/getCachedFeeds';
import { formatISO, getUnixTime } from 'date-fns';

type StreamItem = {
  title: string;
  permalink: string;
  published: string | number | Date;
  timestamp: number;
  type: string;
  image: string;
};

export async function GET(request: NextRequest) {
  let results: StreamItem[] = [];
  /*
  const flickr = await getCachedFlickr();
  flickr.items.slice(0, 5).forEach((item: { title: any; link: any; created: number; images: { [x: string]: { [x: string]: any } }[] }) => {
    results.push({
      title: item.title,
      permalink: item.link,
      published: moment(item.created).utc().format(),
      timestamp: moment(item.created).unix(),
      type: 'Flickr',
      image: item.link,
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
  */
  const pixelfed = await getCachePixelfed();
  pixelfed.slice(0, 5).forEach((item: { content: any; url: any; created_at: string | number | Date; media_attachments: { url: any }[] }) => {
    results.push({
      title: item.content,
      permalink: item.url,
      published: formatISO(new Date(item.created_at)),
      timestamp: getUnixTime(new Date(item.created_at)),
      type: 'Pixelfed',
      image: item.media_attachments[0].url,
    });
  });

  if (results) {
    return NextResponse.json({ results });
  }
  return new Response(null, {
    status: 400,
  });
}
