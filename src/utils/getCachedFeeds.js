import Parser from 'rss-parser';
import fsCache from './fsCache';

const flickr_base = 'https://www.flickr.com';
const instagram_base = 'https://feeds.behold.so';
const flickr_username = process.env.FLICKR_USERNAME;
const instagram_username = process.env.INSTAGRAM_USERNAME;
const hours = 10;

const getCachedFlickr = async () => {
  return fsCache('flickr', hours, async () => {
    const parser = new Parser({
      customFields: {
        item:[
          ['flickr:date_taken','dateTaken'],
          ['link', 'images', {keepArray: true}]
        ],
      }
    });
    
    const url = `${flickr_base}/services/feeds/photos_public.gne?id=${flickr_username}`;
    return parser.parseURL(url);
  });
}

const getCacheInstagram = async () => {
  return fsCache('instagram', hours, async () => {
    const url = `${instagram_base}/${instagram_username}`;
    const instagram = await fetch(url);
    return instagram.json();
  });
}

export { getCachedFlickr, getCacheInstagram };