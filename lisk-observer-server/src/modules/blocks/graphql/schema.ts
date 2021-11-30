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

  type Block {
    id: String!
    height: String!
    timestamp: String!
    generatorPublicKey: String
    reward: String
    isFinal: Boolean
    username: String
    address: String
    finalized: String
  }
  
  type Transaction {
    id: String
    height: String
    moduleAssetId: String!
    nonce: String
    blockId: String
    timestamp: String
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
  }
  
  type BlockWithTransactions {
    block: Block
    transactions: [Transaction]
  }
  
  type PaginatedBlock {
    data: [Block]
    pagination: Pagination
  }
  
  type BlockLegacy {
    isLegacy: Boolean
    height: Int
    id: String
    timestamp: String
    numberOfTransactions: Int
    totalAmount: String
    totalFee: String
    reward: String
    generatorPublicKey: String
    username: String
    address: String
  }
  
  union BlockTransactionsOrLegacy = BlockWithTransactions | BlockLegacy

  type Query {
    block(id: String): BlockTransactionsOrLegacy
    lastBlock: Block
    lastBlocks(page: Int): PaginatedBlock
    blocksByAddress(address: String!, page: Int): PaginatedBlock
  }
`);
