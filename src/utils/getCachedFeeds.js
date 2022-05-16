import cache from "memory-cache";
import Parser from 'rss-parser';

const flickr_base = "https://www.flickr.com";
const instagram_base = "https://feeds.behold.so";
const flickr_username = process.env.FLICKR_USERNAME;
const instagram_username = process.env.INSTAGRAM_USERNAME;
const hours = 10;

const getCachedFlickr = async () => {
  const cached = cache.get("flickr");
  if (cached) {
    return cached;
  }
  const parser = new Parser({
    customFields: {
       item:[
         ['flickr:date_taken','dateTaken'],
        ['link', 'images', {keepArray: true}]
       ],
    }
  });
  
  const url = `${flickr_base}/services/feeds/photos_public.gne?id=${flickr_username}`;
  const feed = await parser.parseURL(url);

  cache.put("flickr", feed, hours * 1000 * 60 * 60);
  return feed;
}

const getCacheInstagram = async () => {
  const cached = cache.get("instagram");
  if (cached) {
    return cached;
  }
  const url = `${instagram_base}/${instagram_username}`;
  const instagram = await fetch(url);
  const instagramImages = await instagram.json();

  cache.put("instagram", instagramImages, hours * 1000 * 60 * 60);
  return instagramImages;
}

export { getCachedFlickr, getCacheInstagram };