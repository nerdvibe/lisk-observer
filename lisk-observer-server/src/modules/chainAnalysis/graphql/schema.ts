import { buildSchema } from "graphql";

export const schema = buildSchema(`  
  type Topamountintrans {
    height:           Float
    id:               String
    transactionid:    String
    senderaddress:    String
    recipientaddress: String
    timestamp:        Float
    amount:           Float
    exchange:        String
  }

  type Day {
    all:                            Float
    transfer:                       Float
    multisigregister:               Float
    delegateregister:               Float
    vote:                           Float
    tokenunlock:                    Float
    delegatemisbehavior:            Float
    reclaimlsk:                     Float
    amounttransferredall:           Float
    amounttransferredfromexchanges: Float
    amounttransferredtoexchanges:   Float
    amounttransferrednonexchanges:  Float
    activeaddresses:                Float
    inactiveaddresses:              Float
    totalrewards:                   Float
    totalfees:                      Float
    totalburned:                    Float
    topamountintransall:            [Topamountintrans]
    topamountintranstoexchange:     [Topamountintrans]
    topamountintransfromexchange:   [Topamountintrans]
    topamountintransnonexchange:    [Topamountintrans]
  }

  type ChainAnalysisData {
    overall: Day
    hour:    Day
    day:     Day
    week:    Day
    month:   Day
  }
 
  type Query {
    """
    This query returns the prices of the LSK token across exchanges
    """
    chainAnalysis: ChainAnalysisData
  }
`);
