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
    """
    This query searches through Accounts, Blocks and Transactions given a term. The search works for the legacy and > 3.0 chain.
    """
    search(term: String!): Search
  }
`);
