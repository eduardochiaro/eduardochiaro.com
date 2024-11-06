import { NextRequest, NextResponse } from 'next/server';
import Parser from 'rss-parser';
import fsCache from '@/utils/fsCache';
import stripTags from '@/utils/stripTags';
import cutString from '@/utils/cutString';

let parser = new Parser();

const url = 'https://blog.eduardochiaro.com/rss/';

const { RSS_CACHE_HOURS = '5' } = process.env;

type RssFeedItem = {
  title: string | undefined;
  permalink: string | undefined;
  published: moment.MomentInput | undefined;
  content: string | undefined;
  categories: string[] | undefined;
};

export async function GET(request: NextRequest) {
  const results = await fsCache(url, parseInt(RSS_CACHE_HOURS), async () => {
    const feed = await parser.parseURL(url);
    const results: RssFeedItem[] = [];
    feed.items.forEach((item) => {
      const content = item.content ? cutString(stripTags(item.content), 400) + '...' : undefined;
      results.push({
        title: item.title,
        permalink: item.link,
        published: item.published,
        content,
        categories: item.categories,
      });
    });
    return results;
  });

  if (results) {
    return NextResponse.json({ results });
  }
  return new Response(null, {
    status: 400,
  });
}
