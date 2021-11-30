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
    votes(page: Int!): PaginatedVotes
  }
`);
