import { coreDb } from "../../db";
import {
  accountsByAddressCacheGet,
  accountsByPublicKeyCacheGet,
} from "@modules/accounts/cache/currentCache";

export const getTransactionMessages = async (page: number) => {
  const transactions = await coreDb("transactions")
    .whereNotNull("data")
    .select(
      "transactions.id",
      "transactions.timestamp",
      "transactions.moduleAssetId",
      "transactions.amount",
      "transactions.data"
    )
    .orderBy("timestamp", "desc")
    .paginate({
      perPage: 10,
      currentPage: page,
    });

  transactions.data = transactions.data.map(async (tx) => {
    const cacheSender = accountsByPublicKeyCacheGet(tx.senderPublicKey || "");

    const cacheRecipient = accountsByAddressCacheGet(tx.recipientId || "");

    return {
      senderUsername: cacheSender.username,
      senderId: cacheSender.address,
      recipientUsername: cacheRecipient.username,
      ...tx,
    };
  });

  return transactions;
};
