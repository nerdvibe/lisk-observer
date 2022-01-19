import { buildSchema } from "graphql";

export const schema = buildSchema(`

  type Countries {
    country: String,
    count: Int
  }

  type Peers {
    connected: Boolean,
    ipAddress: String,
    peerId: String,
    networkVersion: String,
    height: String,
    country: String
  }

  type NetworkVersion {
    version: String,
    peers: Int,
  }

  type NetworkPeersStat {
    totalPeers: Int,
    connectedPeers: Int,
    disconnectedPeers: Int,
    networkVersionDominant: String,
    networkVersion: [NetworkVersion],
  }

  type NetworkInfo {
    stats: NetworkPeersStat,
    peers: [Peers],     
    countries: [Countries]
}
  
  type Query {
    """
    This query returns the network info available on Lisk Observer
    """
    networkInfo: NetworkInfo
  }
`);
