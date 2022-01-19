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
    """
    This query returns the historical prices of LSK token based on the currency passed in the parameter
    """
    getHistoricalPrices(currency: Currencies): CurrencyData
    """
    This query returns the last price of LSK token for the selected currency
    """
    lastTicks: LastTicks
  }
`);
