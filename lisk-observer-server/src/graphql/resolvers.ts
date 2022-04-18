import { mergeResolvers } from "@graphql-tools/merge";

// Queries
import { queries as blocksQueries } from "../modules/blocks/graphql/queries";
import { queries as accountsQueries } from "../modules/accounts/graphql/queries";
import { queries as transactionsQueries } from "../modules/transactions/graphql/queries";
import { queries as delegatesQueries } from "../modules/delegates/graphql/queries";
import { queries as nodeInfoQueries } from "../modules/nodeInfo/graphql/queries";
import { queries as searchQueries } from "../modules/search/graphql/queries";
import { queries as pricesQueries } from "../modules/prices/graphql/queries";
import { queries as votesQueries } from "../modules/votes/graphql/queries";
import { queries as knwonAddressesQueries } from "../modules/knownAddresses/graphql/queries";
import { queries as statsQueries } from "../modules/stats/graphql/queries";
import { queries as networkQueries } from "../modules/network/graphql/queries";
import { queries as exchangesQueries } from "../modules/exchanges/graphql/queries";

// Mutations
// import {mutations as transactionsMutations} from "@modules/transactions/graphql/mutations";

// setup resolvers
const resolvers = [
  blocksQueries,
  accountsQueries,
  transactionsQueries,
  delegatesQueries,
  nodeInfoQueries,
  searchQueries,
  pricesQueries,
  votesQueries,
  knwonAddressesQueries,
  statsQueries,
  networkQueries,
  exchangesQueries,
];

// Merged resolvers
export const root = mergeResolvers(resolvers);
