import { loader } from "graphql.macro";
const query = loader("./queries/blockHeightQuery.graphql");

export const BLOCK_HEIGHT_QUERY = query;
