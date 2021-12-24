import { logger } from "@modules/log";
import { sendGraphqlError } from "../../../graphql/util";
import { getTransaction } from "@modules/transactions/getTransaction";
import { getBlock } from "@modules/blocks/getBlock";
import { getTransactions } from "@modules/transactions/getTransactions";
import { getTransactionByAddress } from "@modules/transactions/getTransactionByAddress";
import { getTransactionMessages } from "@modules/transactions/getTransactionMessages";
import { statByKeyCacheGet } from "@modules/stats/cache";
import { TransactionWithBlock } from "@modules/transactions/types";
import { TX_TYPES } from "@modules/transactions/const";
import { getTransactionLegacy } from "@modules/transactions/getTransactionLegacy";
import { isLegacyAddress } from "@modules/utils/lisk/addresses";
import { getTransactionsByAddressLegacy } from "@modules/transactions/getTransactionsByAddressLegacy";
import { whaleTransactions } from "../whaleTransactions";

const log = logger("TRANSACTION_QUERIES");

export const queries = {
  transactions: async ({ page = 1, TXType }) => {
    try {
      const transactions = await getTransactions(page, TXType as TX_TYPES);

      return transactions;
    } catch (e) {
      log.error(e);
      sendGraphqlError(new Error("Error fetching the transactions data"));
    }
  },

  transaction: async ({ id }) => {
    if (!id) {
      throw new Error("Missing TXID");
    }

    const isLegacyId = !isNaN(+id);

    try {
      if (!isLegacyId) {
        const transaction = await getTransaction(id);
        const block = await getBlock({ id: transaction.blockId });

        const transactionWithBlock: TransactionWithBlock = {
          ...transaction,
          blockId: block.id,
          blockHeight: block.height,
          blockTimestamp: block.timestamp,
          blockGeneratorPublicKey: block.generatorPublicKey,
          blockIsFinal: !!block.isFinal,
          blockUsername: block.username,
          blockAddress: block.address,
        };

        return transactionWithBlock;
      } else if (isLegacyId && id.length > 10) {
        const transaction = await getTransactionLegacy(id);
        transaction.isLegacy = true;
        if (transaction.id) {
          const block = await getBlock({
            id: "",
            heightOrLegacyID: transaction.blockId,
          });
          return {
            transaction,
            block,
          };
        }
      }
      return {};
    } catch (e) {
      log.error(e);
      sendGraphqlError(new Error("Error fetching the transactions data"));
    }
  },

  transactionsByAddress: async ({ address, page }) => {
    if (isLegacyAddress(address)) {
      try {
        const transactions = await getTransactionsByAddressLegacy(
          address,
          page
        );
        return transactions;
      } catch (e) {
        log.error(e);
        sendGraphqlError(new Error("Error fetching the transactions data"));
      }
    } else {
      try {
        const transactions = await getTransactionByAddress(address, page);
        return transactions;
      } catch (e) {
        log.error(e);
        sendGraphqlError(new Error("Error fetching the transactions data"));
      }
    }
  },

  eternityWall: async ({ page }) => {
    try {
      const transactions = await getTransactionMessages(page);

      return transactions;
    } catch (e) {
      log.error(e);
      sendGraphqlError(new Error("Error fetching the transactions data"));
    }
  },

  txStats: async () => {
    try {
      const lastDay = statByKeyCacheGet("count24hTXs");

      return {
        lastDay: lastDay,
      };
    } catch (e) {
      log.error(e);
      sendGraphqlError(new Error("Error fetching the transactions data"));
    }
  },

  whaleTransactions: async ({ page }) => {
    return whaleTransactions(page);
  },
};
