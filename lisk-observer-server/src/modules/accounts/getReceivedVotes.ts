import { coreDb } from "../../db";
import { accountsByAddressCacheGet } from "@modules/accounts/cache/currentCache";

export const getReceivedVotes = async (address: string) => {
  const votes = await coreDb("votes_aggregate")
    .select("sentAddress", "receivedAddress", "amount")
    .where("receivedAddress", address);

  const receivedVotes = votes.map((vote) => {
    const delegate = accountsByAddressCacheGet(vote.sentAddress);

    return {
      amount: vote.amount,
      sender: vote.sentAddress,
      senderUsername: delegate.username,
    };
  });

  return receivedVotes;
};
