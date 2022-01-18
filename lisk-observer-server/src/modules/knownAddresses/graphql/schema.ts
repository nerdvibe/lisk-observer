import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type KnownAddresses {
    address: String
    identifier: String
    isExchange: Boolean
    isLiskHq: Boolean
    isScam: Boolean
    tag: String
    balance: String
  }

  type Query {
    """
    This query returns the list of known addresses from Lisk Observer.
    """
    knownAddresses: [KnownAddresses]
  }
`);
