import { sendGraphqlError } from "../../../graphql/util";
import { logger } from "@modules/log";
import {
  allDelegatesCache,
  delegatesPromisesGet,
} from "@modules/delegates/cache";
import { getBlock } from "@modules/blocks/getBlock";
import { statByKeyCacheGet } from "@modules/stats/cache";
import { calculateTotalSupply } from "@modules/utils/supply";

const log = logger("ACCOUNT_QUERIES");

export const queries = {
  delegates: async () => {
    try {
      const locked = statByKeyCacheGet("lockedAmount");
      const supply = calculateTotalSupply();
      const delegates = allDelegatesCache();
      const promises = delegatesPromisesGet();

      return {
        locked,
        supply,
        delegates: {
          total: delegates.length,
          delegates: delegates.splice(0, 500),
        },
        promises,
      };
    } catch (e) {
      log.error(e);
      sendGraphqlError(new Error("Error fetching the account data"));
    }
  },

  // TODO: TO DEPRECATE ONCE LISK.VOTE MOVES TO THE OTHER delegates QUERY - DUPLICATED CODE
  liskVoteStats: async () => {
    try {
      const locked = statByKeyCacheGet("lockedAmount");
      const supply = calculateTotalSupply();
      const delegates = allDelegatesCache();
      const promises = delegatesPromisesGet();

      return {
        locked,
        supply,
        delegates: {
          total: delegates.length,
          delegates: delegates.splice(0, 500),
        },
        promises,
      };
    } catch (e) {
      log.error(e);
      sendGraphqlError(new Error("Error fetching the transactions data"));
    }
  },
};
