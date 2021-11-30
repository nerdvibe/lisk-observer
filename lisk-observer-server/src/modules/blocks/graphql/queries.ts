import { coreDb } from "../../../db";
import { sendGraphqlError } from "../../../graphql/util";
import { logger } from "@modules/log";
import { accountsByPublicKeyCacheGet } from "@modules/accounts/cache/currentCache";
import { getBlock } from "@modules/blocks/getBlock";
import { getTransactionsByHeight } from "@modules/transactions/getTransactionsByBlockId";
import { blocksByAddress } from "@modules/blocks/blocksByAddress";
import {
  HEIGHT_CACHE_KINDS,
  heightsByKeyCacheGet,
} from "@modules/blocks/cache";

const log = logger("BLOCKS_QUERIES");

interface BlocksByAddressVariables {
  address: string;
  page: number;
}

export const queries = {
  lastBlock: async () => {
    try {
      const finalizedHeight = heightsByKeyCacheGet(
        HEIGHT_CACHE_KINDS.FINALIZED
      );

      const block = await getBlock();
      return {
        ...block,
        finalized: finalizedHeight,
      };
    } catch (e) {
      log.error(e);
      sendGraphqlError(new Error("Error fetching the last block"));
    }
  },
  block: async ({ id }) => {
    try {
      // If id is a number, then is an height
      const blockParams = {
        id: !+id ? id : undefined,
        heightOrLegacyID: +id ? id : undefined,
      };
      const block = await getBlock(blockParams);

      if (!block) {
        return {};
      }

      if (!block.isLegacy) {
        const transactions = await getTransactionsByHeight(block.height);

        return {
          block,
          transactions,
        };
      } else {
        return block;
      }
    } catch (e) {
      log.error(e);
      sendGraphqlError(new Error("Error fetching the last block"));
    }
  },
  lastBlocks: async ({ page = 1 }) => {
    try {
      const blocks = await coreDb("blocks")
        .select(
          "blocks.id",
          "blocks.generatorPublicKey",
          "blocks.height",
          "blocks.timestamp",
          "blocks.reward",
          "blocks.isFinal"
        ) //, 'accounts.username', 'accounts.address')
        .orderBy("height", "desc")
        .paginate({
          perPage: 20,
          currentPage: page,
          isLengthAware: true,
        });

      blocks.data = blocks.data.map(async (block) => {
        if (block.height === +process.env.FORK_HEIGHT + 1) {
          return {
            ...block,
            username: "Genesis block",
            generatorPublicKey: "Genesis block",
            address: null,
          };
        }

        const cache = accountsByPublicKeyCacheGet(block.generatorPublicKey);

        return {
          username: cache.username,
          address: cache.address,
          ...block,
        };
      });

      return blocks;
    } catch (e) {
      log.error(e);
      sendGraphqlError(new Error("Error fetching the blocks"));
    }
  },
  blocksByAddress: async ({ address, page }: BlocksByAddressVariables) => {
    try {
      return await blocksByAddress(address, page);
    } catch (e) {
      log.error(e);
      sendGraphqlError(new Error("Error fetching the last block"));
    }
  },
};
