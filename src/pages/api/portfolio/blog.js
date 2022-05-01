import apiWithMiddleware from '../../../lib/apiWithMiddleware';
import cors from '../../../middlewares/cors';
import Parser from 'rss-parser';
const parser = new Parser();

const handler = async (req, res) => {
  await cors(req, res);
  
  const feed = await parser.parseURL('https://blog.eduardochiaro.com/rss/');

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

  res.status(200).json({ results });
}
export default apiWithMiddleware(handler);