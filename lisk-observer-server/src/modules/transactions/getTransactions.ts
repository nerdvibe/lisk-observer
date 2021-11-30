import { coreDb } from "../../db";
import { accountsByAddressCacheGet } from "@modules/accounts/cache/currentCache";
import { TX_TYPES } from "@modules/transactions/const";
import { getBase32AddressFromPublicKey } from "@modules/utils/lisk/addresses";
import { fetchVoteById } from "@modules/transactions/fetchVoteById";

export const getTransactions = async (page: number, TXType: TX_TYPES) => {
  if (TXType && !Object.values(TX_TYPES).includes(TXType)) {
    throw new Error("TX type not allowed");
  }

  const transactions = await coreDb("transactions")
    .select("transactions.*")
    .orderBy("timestamp", "desc")
    .where((qb) => (TXType ? qb.where("moduleAssetId", TXType) : null))
    .paginate({
      perPage: 50,
      currentPage: page,
      isLengthAware: true,
    });

  transactions.data = transactions.data.map(async (tx) => {
    const senderAddress = getBase32AddressFromPublicKey(tx?.senderPublicKey);
    const cacheSender = accountsByAddressCacheGet(senderAddress);
    const cacheRecipient = accountsByAddressCacheGet(tx?.recipientId || "");
    let voteAmount = 0;

    if (tx.moduleAssetId === TX_TYPES.VOTE) {
      const vote = await fetchVoteById(tx.id);
      voteAmount = vote.amount || 0;
    }
    return {
      senderUsername: cacheSender.username,
      senderId: cacheSender.address,
      recipientUsername: cacheRecipient.username,
      voteAmount,
      ...tx,
    };
  });

  return transactions;
};
