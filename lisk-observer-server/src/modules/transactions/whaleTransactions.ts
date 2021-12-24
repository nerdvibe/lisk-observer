import { coreDb } from "../../db";
import { accountsByAddressCacheGet } from "@modules/accounts/cache/currentCache";
import { getBase32AddressFromPublicKey } from "@modules/utils/lisk/addresses";

const MIN_WHALE_TRANSACTION = "1000000000000"; // 10k
const RESULTS_PER_PAGE = 50;

export const whaleTransactions = async (page: number) => {
  const transactions = await coreDb("transactions")
    .select("transactions.*")
    .orderBy("timestamp", "desc")
    .where("amount", ">=", MIN_WHALE_TRANSACTION)
    .paginate({
      perPage: RESULTS_PER_PAGE,
      currentPage: page,
      isLengthAware: true,
    });

  transactions.data = transactions.data.map(async (tx) => {
    const senderAddress = getBase32AddressFromPublicKey(tx?.senderPublicKey);
    const cacheSender = accountsByAddressCacheGet(senderAddress);
    const cacheRecipient = accountsByAddressCacheGet(tx?.recipientId || "");

    return {
      senderUsername: cacheSender.username,
      senderId: cacheSender.address,
      recipientUsername: cacheRecipient.username,
      ...tx,
    };
  });

  return transactions;
};
