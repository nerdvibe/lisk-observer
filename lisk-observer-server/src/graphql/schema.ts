import { mergeSchemas } from "@graphql-tools/merge";

// Schemas
import { schema as blocksSchema } from "../modules/blocks/graphql/schema";
import { schema as accountsSchema } from "../modules/accounts/graphql/schema";
import { schema as transactionsSchema } from "../modules/transactions/graphql/schema";
import { schema as delegatesSchema } from "../modules/delegates/graphql/schema";
import { schema as nodeInfoSchema } from "../modules/nodeInfo/graphql/schema";
import { schema as searchSchema } from "../modules/search/graphql/schema";
import { schema as pricesSchema } from "../modules/prices/graphql/schema";
import { schema as votesSchema } from "../modules/votes/graphql/schema";
import { schema as knownAddressesSchema } from "../modules/knownAddresses/graphql/schema";
import { schema as statsSchema } from "../modules/stats/graphql/schema";
import { schema as networkSchema } from "../modules/network/graphql/schema";

// Resolvers
import { resolvers as blocksResolvers } from "../modules/blocks/graphql/resolvers";
import { resolvers as transactionsResolvers } from "../modules/transactions/graphql/resolvers";

// setup subschema configurations
export const blocksSubschema = { schema: blocksSchema };
export const accountsSubschema = { schema: accountsSchema };
export const transactionsSubschema = { schema: transactionsSchema };
export const delegatesSubschema = { schema: delegatesSchema };
export const nodeInfoSubschema = { schema: nodeInfoSchema };
export const searchSubschema = { schema: searchSchema };
export const pricesSubschema = { schema: pricesSchema };
export const votesSubschema = { schema: votesSchema };
export const knownAddressesSubschema = { schema: knownAddressesSchema };
export const statsSchemaSubSchema = { schema: statsSchema };
export const networkSchemaSubSchema = { schema: networkSchema };

// Merged schemas
export const graphqlSchema = mergeSchemas({
  schemas: [
    blocksSchema,
    accountsSchema,
    transactionsSchema,
    delegatesSchema,
    nodeInfoSchema,
    searchSchema,
    pricesSchema,
    votesSchema,
    knownAddressesSchema,
    statsSchema,
    networkSchema,
  ],
  resolvers: {
    ...blocksResolvers,
    ...transactionsResolvers,
  },
});
