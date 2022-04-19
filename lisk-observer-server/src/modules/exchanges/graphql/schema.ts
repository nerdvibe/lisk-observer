import { buildSchema } from "graphql";

export const schema = buildSchema(`  
  type Market {
    base: String
    target: String
    last: Float,
    trade_url: String
  } 
  type MarketData { 
    exchangeName: String
    volume: String
    image: String
    markets:  [Market]
  }
 
  type Query {
    """
    This query returns the prices of the LSK token across exchanges
    """
    marketData: [MarketData]
  }
`);
