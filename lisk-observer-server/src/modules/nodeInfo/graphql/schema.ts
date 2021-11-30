import { buildSchema } from "graphql";

export const schema = buildSchema(`
   
  type NodeInfo {
    name: String
  } 

  type Query {
    nodeInfo: NodeInfo
  }
`);
