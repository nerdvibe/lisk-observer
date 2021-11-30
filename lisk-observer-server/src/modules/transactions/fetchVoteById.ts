import { coreDb } from "../../db";

export const fetchVoteById = async (txId: string) => {
  return coreDb("votes").select("amount").where("id", txId).first();
};
