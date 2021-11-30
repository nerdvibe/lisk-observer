import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Pagination {
    total: Int
    lastPage: Int
    currentPage: Int
    perPage: Int
    from: Int
    to: Int
  }
  type Vote {
    delegateAddress: String
    delegateUsername: String
    amount: String
  }
  type MultisigRegistration {
    numberOfSignatures: Int
    mandatoryKeys: [String]
    optionalKeys: [String]
  }
  type TokenUnlock {
    delegateAddress: String
    amount: String
    unvoteHeight: String
    username: String
  }
  type PomData {
    address: String
    username: String
  }
  type Transaction {
    id: String!
    height: String!
    moduleAssetId: String!
    nonce: String!
    blockId: String!
    timestamp: String!
    senderPublicKey: String
    senderId: String
    recipientId: String
    amount: String
    data: String
    size: String
    fee: String
    minFee: String
    senderUsername: String
    recipientUsername: String
    votes: [Vote]
    voteAmount: String
    isFinalized: Boolean
  }
  type TransactionWithBlock {
    id: String!
    height: String!
    moduleAssetId: String!
    nonce: String!
    blockId: String!
    timestamp: String!
    senderPublicKey: String
    senderId: String
    recipientId: String
    amount: String
    data: String
    size: String
    fee: String
    isFinalized: Boolean
    senderUsername: String
    recipientUsername: String
    blockHeight: String
    blockTimestamp: String!
    blockGeneratorPublicKey: String!
    blockIsFinal: String!
    blockUsername: String!
    blockAddress: String
    votes: [Vote]
    multisigRegistration: MultisigRegistration
    tokenUnlock: [TokenUnlock]
    pomData: PomData
  }
  type EthernityWallMessage {
    id: String!
    moduleAssetId: String!
    timestamp: String!
    senderId: String
    amount: String
    data: String
    senderUsername: String
  }
  
  type PaginatedTransaction {
    data: [Transaction]
    pagination: Pagination
  } 
  
  type PaginatedEthernityWallMessage {
    data: [EthernityWallMessage]
    pagination: Pagination
  } 
  
  type TXStats {
    lastDay: Int
  }
  
  type TransactionLegacy {
    isLegacy: Boolean
    id: String!
    blockId: String
    type: Int
    timestamp: Int
    senderPublicKey: String
    senderId: String
    recipientId: String
    amount: String
    fee: String
    signatures: String
    data: String
    asset: String
    senderUsername: String
    recipientUsername: String
  }
  
  type BlockLegacyForTransactions {
    isLegacy: Boolean
    height: Int
    id: String
    timestamp: String
    numberOfTransactions: Int
    totalAmount: String
    totalFee: String
    reward: String
    username: String
    address: String
    generatorPublicKey: String
  }
  
  type TransactionWithBlockLegacy {
   transaction: TransactionLegacy
   block: BlockLegacyForTransactions
  }
  
  type PaginatedTransactionLegacy {
   data: [TransactionLegacy]
   pagination: Pagination
  }
  
  union TransactionWithBlockOrLegacy = TransactionWithBlock | TransactionWithBlockLegacy
  union PaginatedTransactionOrLegacy = PaginatedTransaction | PaginatedTransactionLegacy

  type Query {
    transactionsByAddress(address: String!, page: Int!): PaginatedTransactionOrLegacy
    transaction(id: String!): TransactionWithBlockOrLegacy
    transactions(page: Int, TXType: String): PaginatedTransaction
    eternityWall(page: Int): PaginatedEthernityWallMessage
    txStats: TXStats
  }
`);
