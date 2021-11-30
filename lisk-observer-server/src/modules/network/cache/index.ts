import NodeCache from "node-cache";

export const networkCache = new NodeCache();
const networkCacheKey = "NETWORK_CACHE";

interface NetworkCache {
  stats: {
    totalPeers: number;
    connectedPeers: number;
    disconnectedPeers: number;
    networkVersionDominant: string;
    networkVersion: {
      version: string;
      peers: number;
    }[];
  };
  peers: {
    connected: boolean;
    ipAddress: string;
    peerId: string;
    networkVersion: string;
    height: string;
    country: string;
  }[];

  countries: {
    country: string;
    count: number;
  }[];
}

export const networkCacheSet = async (value: NetworkCache) => {
  await networkCache.set(networkCacheKey, value);
};

export const networkCacheGet = (): NetworkCache => {
  return networkCache.get(networkCacheKey);
};
