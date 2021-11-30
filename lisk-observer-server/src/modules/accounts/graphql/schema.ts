import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Token {
    balance: String
    locked: String
    }
  
  type Sequence {
    nonce: String
    }
  
  type Keys {
    numberOfSignatures: String
    mandatoryKeys: [String]
    optionalKeys: [String]
    }
  
  type Dpos {
    delegate: Delegate
    sentVotes: [SentVotes]
    receivedVotes: [ReceivedVotes]
    unlocking: [Unlocking]
    }
  
  type Delegate {
    username: String
    pomHeights: [Int]
    consecutiveMissedBlocks: Int
    lastForgedHeight: Int
    isBanned: Boolean
    totalVotesReceived: String
    selfVotesAmount: Float
    rankAdjusted: Int
    isConsensusParticipant: Boolean
    minActiveHeight: Int
    nextForgingTime: Int
    producedBlocks: Int
    rank: Int
    }
  
  type SentVotes {
        delegateAddress: String
        delegateUsername: String
        amount: String
      }
  type ReceivedVotes {
        sender: String
        senderUsername: String
        amount: String
      }
  
  type Unlocking {
        delegateAddress: String
        amount: String
        unvoteHeight: String
        delegateUsername: String
      }
  
  type Account {
    username: String
    address: String
    isDelegate: Boolean
    token: Token
    sequence: Sequence
    keys: Keys
    dpos: Dpos
    hexAddress: String
    publicKey: String
  }
  
  type LegacyAccount {
    username: String
    address: String
    balance: String
    publicKey: String
  }
  
  type Pagination {
    total: Int
    lastPage: Int
    currentPage: Int
    perPage: Int
    from: Int
    to: Int
  }
  
  type RichListAccount {
    address: String
    balance: String
    username: String
    unlocked: String
  }
    
  type PaginatedRichListAccount {
    data: [RichListAccount]
    pagination: Pagination
  }
  
  type RichList {
    accounts: PaginatedRichListAccount
    supply: Int
  }

  type Query {
    account(address: String!): Account
    accountLegacy(address: String!): LegacyAccount
    richList(page: Int): RichList
  }
`);
