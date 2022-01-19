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
    """
    This query returns the block given a block id. It returns either a > 3.0 block or a legacy chain block.
    """
    block(id: String): BlockTransactionsOrLegacy
    """
    This query returns the last block available in the chain.
    """
    lastBlock: Block
    """
    This query returns the last 10 blocks, in a paginated form. It supports blocks up to the genesis of 3.0.
    """
    lastBlocks(page: Int): PaginatedBlock
    """
    Similar to lastBlocks, this query returns the last 10 blocks by address, in a paginated form. It supports blocks up to the genesis of 3.0.
    """
    blocksByAddress(address: String!, page: Int): PaginatedBlock
  }
`);
