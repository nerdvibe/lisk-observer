import { archiveDb, coreDb } from "../../db";
import { parseLegacyTransaction } from "@modules/transactions/util/parseLegacyTransaction";

export const getTransactionsByAddressLegacy = async (
  address: number,
  page: number
) => {
  const transactions = await archiveDb("trs")
    .select("*")
    .orderBy("timestamp", "desc")
    .where("senderId", address)
    .orWhere("recipientId", address)
    .paginate({
      perPage: 25,
      currentPage: page,
      isLengthAware: true,
    });

  transactions.data = transactions.data.map(parseLegacyTransaction);

  return transactions;
};
