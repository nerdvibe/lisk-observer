import { networkCacheSet } from ".";
import { fetchNetworkInfo } from "../network";

export const buildNetworkCache = async () => {
  const networkInfo = await fetchNetworkInfo();

  networkCacheSet(networkInfo);
};

export const initEmptyNetworkCache = () => {
  networkCacheSet({
    stats: {
      totalPeers: -1,
      connectedPeers: -1,
      disconnectedPeers: -1,
      networkVersionDominant: "-1",
      networkVersion: [
        {
          version: "1",
          peers: 1,
        },
      ],
    },
    peers: [],
    countries: [],
  });
};
