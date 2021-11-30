import { buildSchema } from "graphql";

export const schema = buildSchema(`

  type TxKinds {
    transfers: Int,
    votes: Int,
    poms: Int,
    registerDelegate: Int,
    unlockToken: Int,
  }
  type StatElement {
    date: String,
    count: Int,
    volume: Float
  }

  type StatKind {
      historicalTXs: [StatElement],
      totalCount: Int,
      totalVolume: Float,
      txKinds: TxKinds
  }

  type Stats {
    last24TXs: Int
    blocks: Int,
    staked: String,
    supply: Int,
    totalTransactions: String,
    totalTransactions30: String,
    lastDay: StatKind,
    lastMonth: StatKind,
    lastYear: StatKind,
  }
  
  type Query {
    stats: Stats
  }
`);
