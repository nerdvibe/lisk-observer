import NodeCache from "node-cache";

export const RICHLIST_MAX_CACHED_PAGES = 20;

const richListCache = new NodeCache();

export const richListCacheSet = (page: number, response: any) => {
  richListCache.set(page, response);
};
export const richListCacheGetPage = (page: number) => {
  return richListCache.get(page);
};
