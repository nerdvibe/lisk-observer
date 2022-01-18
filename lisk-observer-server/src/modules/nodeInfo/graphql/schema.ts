import { buildSchema } from "graphql";

export const schema = buildSchema(`
   
  type NodeInfo {
    name: String
  } 

  type Query {
    """
    This query returns the info from the Lisk Observer node.
    """
    nodeInfo: NodeInfo
  }
`);
