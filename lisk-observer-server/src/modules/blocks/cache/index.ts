import NodeCache from "node-cache";

const heights = new NodeCache();

export const enum HEIGHT_CACHE_KINDS {
  "FINALIZED" = "FINALIZED",
  "LAST_BLOCK" = "LAST_BLOCK",
}

export const heightsCacheSet = async (
  kind: HEIGHT_CACHE_KINDS,
  value: number
) => {
  await heights.set(kind, value);
};

export const heightsByKeyCacheGet = (
  kind: HEIGHT_CACHE_KINDS
): any | undefined => {
  return heights.get(kind);
};

export const getLastFinalizedBlockFromCache = () => {
  return heightsByKeyCacheGet(HEIGHT_CACHE_KINDS.FINALIZED);
};
