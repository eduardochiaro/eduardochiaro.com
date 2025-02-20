import Parser from 'rss-parser';
import fsCache from './fsCache';

let parser = new Parser();

const flickr_base = 'https://www.flickr.com';
const instagram_base = 'https://feeds.behold.so';
const pixelfed_base = 'https://pixelfed.social';
const flickr_username = process.env.FLICKR_USERNAME;
const instagram_username = process.env.INSTAGRAM_USERNAME;
const hours = 10;

const getCachedFlickr = async () => {
  return fsCache('flickr', hours, async () => {
    const url = `${flickr_base}/services/feeds/photos_public.gne?id=${flickr_username}`;
    return parser.parseURL(url);
  });
};

const getCacheInstagram = async () => {
  return fsCache('instagram', hours, async () => {
    const url = `${instagram_base}/${instagram_username}`;
    const instagram = await fetch(url, { cache: 'no-store' });
    return instagram.json();
  });
};

const getCachePixelfed = async () => {
  return fsCache('pixelfed', hours, async () => {
    const url = `${pixelfed_base}/api/v1/timelines/home`;
    const pixelfed = await fetch(url, { cache: 'no-store', headers: { Authorization: `Bearer ${process.env.PIXELFED_SECRET}` } });
    const json = await pixelfed.json();
    // filter by account.username
    const account = process.env.PIXELFED_USERNAME;
    return json.filter((item: any) => item.account.username === account);
  });
};

export { getCachedFlickr, getCacheInstagram, getCachePixelfed };
