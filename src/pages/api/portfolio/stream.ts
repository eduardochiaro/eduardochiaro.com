import type { NextApiRequest, NextApiResponse } from 'next';
import moment from 'moment';
import apiWithMiddleware from '@/utils/apiWithMiddleware';
import cors from '@/middlewares/cors';
import { getCachedFlickr, getCacheInstagram } from '@/utils/getCachedFeeds';

type StreamItem = {
  title: string;
  permalink: string;
  published: moment.MomentInput;
  timestamp: number;
  type: string;
  image: string;
};

type Data = {
  results: StreamItem[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);
  const results: StreamItem[] = [];

  const flickr = await getCachedFlickr();


  flickr.items.slice(0, 5).forEach((item: { title: any; link: any; isoDate: moment.MomentInput; images: { [x: string]: { [x: string]: any } }[] }) => {
    console.log(item);
    results.push({
      title: item.title,
      permalink: item.link[0]['href'],
      published: item.isoDate,
      timestamp: moment(item.isoDate).unix(),
      type: 'Flickr',
      image: item.link[1]['href'],
    });
  });

  const instagramImages = await getCacheInstagram();

  instagramImages.slice(0, 5).forEach((item: { caption: any; id: any; permalink: any; timestamp: moment.MomentInput; thumbnailUrl: any; mediaUrl: any }) => {
    results.push({
      title: item.caption || item.id,
      permalink: item.permalink,
      published: item.timestamp,
      timestamp: moment(item.timestamp).unix(),
      type: 'Instagram',
      image: item.thumbnailUrl || item.mediaUrl,
    });
  });

  results.sort(function (x, y) {
    return y.timestamp - x.timestamp;
  });

  res.status(200).json({ results });
};
export default apiWithMiddleware(handler);
