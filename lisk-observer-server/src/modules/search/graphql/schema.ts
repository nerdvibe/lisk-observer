import { buildSchema } from "graphql";

export const schema = buildSchema(`
   
  type AccountSearch {
      username: String
      address: String
    }
  
  type TransactionSearch {
        id: String
      }
  
  type BlockSearch {
        id: String
        height: String
      }
  
  type Search {
    accounts: [AccountSearch]
    transactions: [TransactionSearch]
    blocks: [BlockSearch]
  }

  type Query {
    search(term: String!): Search
  }
`);
