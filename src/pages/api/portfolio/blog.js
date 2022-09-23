import apiWithMiddleware from '@/utils/apiWithMiddleware';
import cors from '@/middlewares/cors';
import Parser from 'rss-parser';
import fsCache from '@/utils/fsCache';

const url = 'https://blog.eduardochiaro.com/rss/';
const hours = 1;

const handler = async (req, res) => {
  await cors(req, res);
  const parser = new Parser();

  const results = await fsCache(url, hours, async () => {
    const feed = await parser.parseURL(url);
    const results = [];
    feed.items.forEach((item) => {
      results.push({
        title: item.title,
        permalink: item.link,
        published: item.isoDate,
        content: item.contentSnippet,
        categories: item.categories,
      });
    });
    return results;
  });

  res.status(200).json({ results });
};
export default apiWithMiddleware(handler);
