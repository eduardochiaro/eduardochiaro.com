import type { NextApiRequest, NextApiResponse } from 'next';
import apiWithMiddleware from '@/utils/apiWithMiddleware';
import cors from '@/middlewares/cors';
import Parser from 'rss-parser';
import fsCache from '@/utils/fsCache';

const url = 'https://blog.eduardochiaro.com/rss/';

const { RSS_CACHE_HOURS = '5' } = process.env;

type RssFeedItem = {
  title: string | undefined;
  permalink: string | undefined;
  published: moment.MomentInput | undefined;
  content: string | undefined;
  categories: string[] | undefined;
};

type Data = {
  results: RssFeedItem[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);
  const parser = new Parser();

  const results = await fsCache(url, parseInt(RSS_CACHE_HOURS), async () => {
    const feed = await parser.parseURL(url);
    const results: RssFeedItem[] = [];
    feed.items.forEach((item) => {
      results.push({
        title: item.title,
        permalink: item.link,
        published: item.isoDate,
        content: item.contentSnippet + '...',
        categories: item.categories,
      });
    });
    return results;
  });

  res.status(200).json({ results });
};
export default apiWithMiddleware(handler);
