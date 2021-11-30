import { coreDb } from "../../db";
import {
  accountsByAddressCacheGet,
  accountsByPublicKeyCacheGet,
} from "@modules/accounts/cache/currentCache";
import { TX_TYPES } from "@modules/transactions/const";
import { fetchVoteById } from "@modules/transactions/fetchVoteById";

export const getTransactionsByHeight = async (height: string) => {
  if (!height) {
    throw new Error("Missing block ID");
  }

  const transactions = await coreDb("transactions")
    .where("height", height)
    .orderBy("timestamp", "desc");

  const transactionsEnriched = transactions.map(async (tx) => {
    const cacheSender = accountsByPublicKeyCacheGet(tx.senderPublicKey || "");

    const cacheRecipient = accountsByAddressCacheGet(tx.recipientId || "");

    let voteAmount = 0;

    if (tx.moduleAssetId === TX_TYPES.VOTE) {
      const vote = await fetchVoteById(tx.id);
      voteAmount = vote.amount || 0;
    }

    return {
      senderUsername: cacheSender.username,
      senderId: cacheSender.address,
      voteAmount,
      recipientUsername: cacheRecipient.username,
      ...tx,
    };
  });

  return transactionsEnriched;
};
