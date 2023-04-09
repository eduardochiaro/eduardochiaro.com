import { parse } from 'rss-to-json';
import fsCache from './fsCache';

const flickr_base = 'https://www.flickr.com';
const instagram_base = 'https://feeds.behold.so';
const flickr_username = process.env.FLICKR_USERNAME;
const instagram_username = process.env.INSTAGRAM_USERNAME;
const hours = 10;

const getCachedFlickr = async () => {
  return fsCache('flickr', hours, async () => {
    const url = `${flickr_base}/services/feeds/photos_public.gne?id=${flickr_username}`;
    return parse(url);
  });
};

const getCacheInstagram = async () => {
  return fsCache('instagram', hours, async () => {
    const url = `${instagram_base}/${instagram_username}`;
    const instagram = await fetch(url);
    return instagram.json();
  });
};

export { getCachedFlickr, getCacheInstagram };
