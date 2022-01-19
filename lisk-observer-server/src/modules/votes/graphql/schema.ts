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
    id: String!
    amount: String!
    sentAddress: String!
    receivedAddress: String!
    timestamp: String!
    senderUsername: String
    recipientUsername: String
  }
  
  
  type PaginatedVotes {
   data: [Vote]
   pagination: Pagination
  }
  

  type Query {
    """
    This query returns the vote transactions sorted by creation time desc, in a paginated form. Works only with >3.0 chain transactions.
    """
    votes(page: Int!): PaginatedVotes
  }
`);
