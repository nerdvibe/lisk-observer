import { coreDb } from "../../db";
import {
  accountsByAddressCacheGet,
  accountsByPublicKeyCacheGet,
} from "@modules/accounts/cache/currentCache";
import axios from "axios";
import { TX_TYPES } from "@modules/transactions/const";
import { Transaction } from "@modules/transactions/types";
import {
  getBase32AddressFromHex,
  getBase32AddressFromPublicKey,
} from "@modules/utils/lisk/addresses";

export const getTransaction = async (id: string) => {
  const transaction = await coreDb("transactions")
    .select("transactions.*")
    .where("id", id)
    .first();

  const {
    data: transactionAPI,
  } = await axios.get(
    `${process.env.LISK_SERVICE_URL}/transactions?transactionId=${id}`,
    { timeout: 2000000 }
  );

  const cacheSender = accountsByPublicKeyCacheGet(
    transaction.senderPublicKey || ""
  );

  const cacheRecipient = accountsByAddressCacheGet(
    transaction.recipientId || ""
  );

  const tx = transactionAPI.data[0];

  if (!tx) {
    return null;
  }
  let sanitizedTX: Transaction = {
    id: tx.id,
    height: tx.height,
    moduleAssetId: tx.moduleAssetId,
    nonce: tx.nonce,
    blockId: tx.block.id,
    timestamp: tx.block.timestamp,
    senderPublicKey: tx.sender.publicKey,
    senderId: tx.sender.address,
    amount: tx.asset.amount,
    isFinalized: !tx.isPending,
    fee: tx.fee,
    data: tx.asset.data || JSON.stringify(tx.asset, null, 2),
  };

  if (tx.moduleAssetId === TX_TYPES.TRANSACTION) {
    sanitizedTX.recipientPublicKey = tx.asset.recipient.publicKey || "";
    sanitizedTX.recipientId = tx.asset.recipient.address || "";
    sanitizedTX.amount = tx.asset.amount;
    sanitizedTX.data = tx.asset.data;
  }
  if (tx.moduleAssetId === TX_TYPES.VOTE) {
    const votes = tx.asset.votes.map(async (vote) => {
      const delegate = accountsByAddressCacheGet(vote.delegateAddress);
      return {
        ...vote,
        delegateUsername: delegate.username,
      };
    });

    sanitizedTX.recipientPublicKey = tx.recipient?.publicKey || "";
    sanitizedTX.recipientId = tx.recipient?.address || "";
    sanitizedTX.amount = "0";
    sanitizedTX.fee = tx.fee;
    sanitizedTX.votes = votes;
  }
  if (tx.moduleAssetId === TX_TYPES.MULTISIG_REG) {
    sanitizedTX.multisigRegistration = { ...tx.asset };
    sanitizedTX.multisigRegistration.mandatoryKeys = sanitizedTX.multisigRegistration.mandatoryKeys.map(
      (address) => {
        return address;
      }
    );
    sanitizedTX.multisigRegistration.optionalKeys = sanitizedTX.multisigRegistration.optionalKeys.map(
      (address) => {
        return address;
      }
    );
  }
  if (tx.moduleAssetId === TX_TYPES.TOKEN_UNLOCK) {
    sanitizedTX.tokenUnlock = tx.asset.unlockObjects.map(async (unlocked) => {
      const address = getBase32AddressFromHex(unlocked.delegateAddress);
      const cacheDelegate = accountsByAddressCacheGet(address || "");
      return {
        ...unlocked,
        delegateAddress: address,
        username: cacheDelegate.username,
      };
    });
  }
  if (tx.moduleAssetId === TX_TYPES.POM_REPORT) {
    const header1Address = getBase32AddressFromPublicKey(
      tx.asset.header1.generatorPublicKey
    );
    const header1Username =
      accountsByAddressCacheGet(header1Address)?.username || "";
    const header2Address = getBase32AddressFromPublicKey(
      tx.asset.header2.generatorPublicKey
    );
    const header2Username =
      accountsByAddressCacheGet(header2Address)?.username || "";

    // attempting to push delegateUsername up in the object
    const dataToReturn = {
      header1: {
        delegateUsername: header1Username,
        ...tx.asset.header1,
      },
      header2: {
        delegateUsername: header2Username,
        ...tx.asset.header2,
      },
    };
    sanitizedTX.data = JSON.stringify(dataToReturn, null, 2);
    sanitizedTX.pomData = {
      address: header1Address,
      username: header1Username,
    };
  }

  sanitizedTX.senderUsername = cacheSender.username;
  sanitizedTX.recipientUsername = cacheRecipient.username;

  return sanitizedTX;
};
