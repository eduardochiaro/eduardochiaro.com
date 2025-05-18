import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'rss-to-json';
import fsCache from '@/utils/fsCache';
import stripTags from '@/utils/stripTags';
import cutString from '@/utils/cutString';

const url = 'https://blog.eduardochiaro.com/rss/';

const { RSS_CACHE_HOURS = '5' } = process.env;

type RssFeedItem = {
  title: string | undefined;
  permalink: string | undefined;
  published: moment.MomentInput | undefined;
  content: string | undefined;
  categories: string[] | undefined;
};

export async function GET(request: NextRequest, response: NextResponse) {
  const results = await fsCache(url, parseInt(RSS_CACHE_HOURS), async () => {
    const feed = await parse(url);
    const results: RssFeedItem[] = [];
    feed.items.forEach((item) => {
      results.push({
        title: item.title,
        permalink: item.link,
        published: item.published,
        content: cutString(stripTags(item.content), 400) + '...',
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
