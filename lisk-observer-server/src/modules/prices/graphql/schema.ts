import { buildSchema } from "graphql";

export const schema = buildSchema(`  
  enum Currencies {
      LSKUSD
      LSKBTC
      LSKEUR
      LSKKRW
      LSKPLN
      LSKJPY
      LSKCNY
      LSKAED
  }
  
  type CurrencyData {
    currency: Currencies
    date: [String]
    value: [Float]
  } 
  type LastTicks { 
    LSKUSD: Float 
    LSKBTC: Float 
    LSKEUR: Float 
    LSKKRW: Float 
    LSKPLN: Float 
    LSKJPY: Float 
    LSKCNY: Float 
    LSKAED: Float 
  }
 
  type Query {
    getHistoricalPrices(currency: String): CurrencyData
    lastTicks: LastTicks
  }
`);
