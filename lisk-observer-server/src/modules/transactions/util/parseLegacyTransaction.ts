import { legacyAccountByAddressCacheGet } from "@modules/accounts/cache/legacyCache";

export const parseLegacyTransaction = (transaction) => {
  const cacheSender = legacyAccountByAddressCacheGet(
    transaction?.senderId || ""
  );

  const cacheRecipient = legacyAccountByAddressCacheGet(
    transaction?.recipientId || ""
  );

  return {
    ...transaction,
    senderUsername: cacheSender.username,
    recipientUsername: cacheRecipient.username,
    senderPublicKey: Buffer.from(transaction?.senderPublicKey || "").toString(
      "hex"
    ),
    data: Buffer.from(transaction?.transferData || "").toString(),
    asset: JSON.stringify(transaction?.asset || {}),
    isLegacy: true,
  };
};
