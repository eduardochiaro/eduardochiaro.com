import cacheApi from 'node-filesystem-cache';

const cachePath = './cache';
const Cache = new cacheApi(cachePath);

const fsCache = (name, hours, useCallback = () => {}) => {
  return Cache.rememberAsync(name, hours * 1000 * 60 * 60, useCallback);
}

export default fsCache;