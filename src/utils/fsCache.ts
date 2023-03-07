import cacheApi from 'node-filesystem-cache';

const cachePath = './out/_cache';
const Cache = new cacheApi(cachePath);

const fsCache = (name: string, hours: number, useCallback = () => {}) => {
  return Cache.rememberAsync(name, hours * 1000 * 60 * 60, useCallback);
};

export default fsCache;
