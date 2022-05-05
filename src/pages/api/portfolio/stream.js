import apiWithMiddleware from '../../../lib/apiWithMiddleware';
import cors from '../../../middlewares/cors';
import cache from "memory-cache";
import Parser from 'rss-parser';

const base = "https://www.flickr.com/services";
const username = process.env.FLICKR_USERNAME;
const hours = 1;

const handler = async (req, res) => {
  await cors(req, res);
  const parser = new Parser({
    customFields: {
       item:[
         ['flickr:date_taken','dateTaken'],
        ['link', 'images', {keepArray: true}]
       ],
    }
  });

  const url = `${base}/feeds/photos_public.gne?id=${username}`;

  const cachedResponse = cache.get(url);
  if (cachedResponse) {
    res.status(200).json({ results: cachedResponse }); return;
  }
  
  const feed = await parser.parseURL(url);

  const results = [];
  feed.items.forEach(item => {
    results.push({
      title: item.title,
      permalink: item.link,
      published: item.isoDate,
      content: item.content,
      type: "Flickr",
      image: item.images[1]['$']['href']
    });
  });
  cache.put(url, results, hours * 1000 * 60 * 60);

  res.status(200).json({ results });
}
export default apiWithMiddleware(handler);