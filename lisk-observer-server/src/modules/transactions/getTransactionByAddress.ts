import { coreDb } from "../../db";
import {
  accountsByAddressCacheGet,
  accountsByPublicKeyCacheGet,
  publicKeyByAddressCacheGet,
} from "@modules/accounts/cache/currentCache";
import { getBase32AddressFromHex } from "@modules/utils/lisk/addresses";
import { TX_TYPES } from "@modules/transactions/const";
import { fetchVoteById } from "@modules/transactions/fetchVoteById";

export const getTransactionByAddress = async (
  address: string,
  page: number
) => {
  let base32Address = address;

  if (address.slice(0, 3) !== "lsk") {
    base32Address = getBase32AddressFromHex(address);
  }

  const publicKey = publicKeyByAddressCacheGet(base32Address);

  const transactions = await coreDb("transactions")
    .where("recipientId", base32Address)
    .orWhere("senderPublicKey", publicKey || "")
    .orderBy("timestamp", "desc")
    .paginate({
      perPage: 25,
      currentPage: page,
      isLengthAware: true,
    });

  transactions.data = transactions.data.map(async (tx) => {
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
      recipientUsername: cacheRecipient.username,
      voteAmount,
      ...tx,
    };
  });

  return transactions;
};
