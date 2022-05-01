import apiWithMiddleware from '../../../lib/apiWithMiddleware';
import cors from '../../../middlewares/cors';
import cache from "memory-cache";
import Parser from 'rss-parser';
const parser = new Parser();

const url = 'https://blog.eduardochiaro.com/rss/';
const hours = 1;

const handler = async (req, res) => {
  await cors(req, res);

  const cachedResponse = cache.get(url);
  if (cachedResponse) {
    res.status(200).json({ results: cachedResponse });
    return;
  }
  
  const feed = await parser.parseURL(url);

  const results = [];
  feed.items.forEach(item => {
    results.push({
      title: item.title,
      permalink: item.link,
      published: item.isoDate,
      content: item.contentSnippet,
      categories: item.categories
    });
  });
  cache.put(url, results, hours * 1000 * 60 * 60);

  res.status(200).json({ results });
}
export default apiWithMiddleware(handler);