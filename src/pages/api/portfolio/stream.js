import moment from 'moment';
import apiWithMiddleware from '@/utils/apiWithMiddleware';
import cors from '@/middlewares/cors';
import { getCachedFlickr, getCacheInstagram } from '@/utils/getCachedFeeds';

const handler = async (req, res) => {
  await cors(req, res);
  const results = [];

  const flickr = await getCachedFlickr();

  flickr.items.slice(0,5).forEach(item => {
    results.push({
      title: item.title,
      permalink: item.link,
      published: item.isoDate,
      timestamp: moment(item.isoDate).unix(),
      type: 'Flickr',
      image: item.images[1]['$']['href']
    });
  });

  const instagramImages = await getCacheInstagram();

  instagramImages.slice(0,5).forEach(item => {
    results.push({
      title: item.caption || item.id,
      permalink: item.permalink,
      published: item.timestamp,
      timestamp: moment(item.timestamp).unix(),
      type: 'Instagram',
      image: item.thumbnailUrl || item.mediaUrl
    });
  });

  results.sort(function(x, y){
    return y.timestamp - x.timestamp;
})

  res.status(200).json({ results });
}
export default apiWithMiddleware(handler);