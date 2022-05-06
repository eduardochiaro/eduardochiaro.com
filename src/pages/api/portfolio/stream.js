import apiWithMiddleware from '../../../lib/apiWithMiddleware';
import cors from '../../../middlewares/cors';
import cache from "memory-cache";
import Parser from 'rss-parser';
import moment from 'moment';

const base = "https://www.flickr.com/services";
const flickr_username = process.env.FLICKR_USERNAME;
const instagram_username = process.env.INSTAGRAM_USERNAME;
const hours = 10;

const getCachedFlickr = async () => {
  const cached = cache.get("flickr");
  if (cached) {
    return cached;
  }
  const parser = new Parser({
    customFields: {
       item:[
         ['flickr:date_taken','dateTaken'],
        ['link', 'images', {keepArray: true}]
       ],
    }
  });
  
  const url = `${base}/feeds/photos_public.gne?id=${flickr_username}`;
  const feed = await parser.parseURL(url);

  cache.put("flickr", feed, hours * 1000 * 60 * 60);
  return feed;
}

const getCacheInstagram = async () => {
  const cached = cache.get("instagram");
  if (cached) {
    return cached;
  }
  const url = `https://feeds.behold.so/${instagram_username}`;
  const instagram = await fetch(url);
  const instagramImages = await instagram.json();

  cache.put("instagram", instagramImages, hours * 1000 * 60 * 60);
  return instagramImages;
}

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
      type: "Flickr",
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
      type: "Instagram",
      image: item.thumbnailUrl || item.mediaUrl
    });
  });

  results.sort(function(x, y){
    return y.timestamp - x.timestamp;
})

  res.status(200).json({ results });
}
export default apiWithMiddleware(handler);