import { archiveDb } from "../../db";
import { legacyAccountByAddressCacheGet } from "@modules/accounts/cache/legacyCache";
import { parseLegacyTransaction } from "@modules/transactions/util/parseLegacyTransaction";

export const getTransactionLegacy = async (id: string) => {
  const tx = await archiveDb("trs")
    .select(
      "id",
      "blockId",
      "type",
      "timestamp",
      "senderPublicKey",
      "senderId",
      "recipientId",
      "amount",
      "fee",
      "signatures",
      "transferData",
      "asset"
    )
    .where("id", id)
    .first();

  // const senderUsername = legacyAccountByAddressCacheGet(tx?.senderId || "");
  // const recipientUsername = legacyAccountByAddressCacheGet(
  //   tx?.recipientId || ""
  // );

  const parsedTx = parseLegacyTransaction(tx);

  return parsedTx;
};
