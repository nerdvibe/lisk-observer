import { logger } from "@modules/log";
import { getGeoIP } from "@modules/utils/geoip";
import axios from "axios";

const log = logger("GEOIP");
const LIMIT_PEERS = 1000;

export const fetchNetworkInfo = async () => {
  try {
    var { data: NetworkStats } = await axios.get(
      `${process.env.LISK_SERVICE_URL}/network/statistics`
    );
  } catch (e) {
    log.error("Failed to get network stats");
    var NetworkStats: any = {
      data: {
        basic: {
          totalPeers: -1,
          connectedPeers: -1,
          disconnectedPeers: -1,
        },
        height: {
          "-1": 1,
        },
        networkVersion: {
          "-1": 1,
        },
      },
    };
  }

  try {
    var { data: NetworkPeersConnected } = await axios.get(
      `${process.env.LISK_CORE_API_URL}/peers?limit=${LIMIT_PEERS}&offset=0&state=connected`
    );
  } catch (e) {
    log.error("Failed to get connected network peers");
    var NetworkPeersConnected: any = { data: [] };
  }
  try {
    var { data: NetworkPeersDisconnected } = await axios.get(
      `${process.env.LISK_CORE_API_URL}/peers?limit=${LIMIT_PEERS}&offset=0&state=disconnected`
    );
  } catch (e) {
    log.error("Failed to get connected network peers");
    var NetworkPeersDisconnected: any = { data: [] };
  }

  const peers = [
    ...NetworkPeersConnected.data.map((c) => {
      return {
        connected: true,
        ipAddress: c.ipAddress,
        peerId: c.peerId,
        networkVersion: c.networkVersion || "unknown",
        height: c.options?.height || "unknown",
        country: "ZZ",
      };
    }),
    ...NetworkPeersDisconnected.data.map((c) => {
      return {
        connected: false,
        ipAddress: c.ipAddress,
        peerId: c.peerId,
        networkVersion: c.networkVersion || "unknown",
        height: c.options?.height || "unknown",
        country: "ZZ",
      };
    }),
  ];

  const countriesCount = {};

  for (const peer of peers) {
    const ipData = await getGeoIP(peer.ipAddress);

    peer.country = ipData.country;
    countriesCount[ipData.country] = countriesCount[ipData.country]
      ? countriesCount[ipData.country] + 1
      : 1;
  }

  const networkVersionArray = Object.keys(NetworkStats.data.networkVersion).map(
    (version) => ({
      version,
      peers: NetworkStats.data.networkVersion[version],
    })
  );

  return {
    stats: {
      totalPeers: NetworkStats.data.basic.totalPeers,
      connectedPeers: NetworkStats.data.basic.connectedPeers,
      disconnectedPeers: NetworkStats.data.basic.disconnectedPeers,
      networkVersionDominant: Object.keys(
        NetworkStats.data.networkVersion
      ).reduce((a, b) =>
        NetworkStats.data.networkVersion[a] >
        NetworkStats.data.networkVersion[b]
          ? a
          : b
      ),
      networkVersion: networkVersionArray,
    },
    peers,
    countries: Object.keys(countriesCount).map((country) => ({
      country,
      count: countriesCount[country],
    })),
  };
};
