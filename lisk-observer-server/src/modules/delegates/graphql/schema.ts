import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Delegate {
    username: String
    pomHeights: [Int]
    consecutiveMissedBlocks: Int
    lastForgedHeight: Int
    isBanned: Boolean
    totalVotesReceived: String
    consensusWeight: String
    selfVotesAmount: Float
    rankAdjusted: Int
    isConsensusParticipant: Boolean
    minActiveHeight: Int
    nextForgingTime: Int
    producedBlocks: Int
    rank: Int
  }
  
  type Dpos {
    delegate: Delegate
  }
  
  type AccountDelegate {
    address: String,
    username: String,
    dpos: Dpos
  }

  type DelegatesList {
    delegates: [AccountDelegate],
    total: Int
  }
    
  type Promises {
    username: String,
    averageShared: Float,
    address: String,
    promisedShare: Float,
  }
    
  type DelegatesWithStats {
     locked: String,
     supply: String,
     delegates: DelegatesList,
     promises: [Promises]
  }


  type Query {
    """
    This query returns the first 500 delegates, sorted by vote weight.
    """
    delegates: DelegatesWithStats
    """
    deprecated
    """
    liskVoteStats: DelegatesWithStats
  }
`);
