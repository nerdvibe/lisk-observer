import { logger } from "@modules/log";
import { sendGraphqlError } from "../../../graphql/util";
import { getBlock } from "@modules/blocks/getBlock";
import { statByKeyCacheGet } from "@modules/stats/cache";
import { LEGACY_CHAIN_TXS_COUNT } from "@modules/stats/cache/buildCache";

const log = logger("STATS_QUERIES");

export const queries = {
  stats: async () => {
    try {
      const block = await getBlock();
      const last24TXs = statByKeyCacheGet("count24hTXs");
      const staked = statByKeyCacheGet("lockedAmount");
      const supply = statByKeyCacheGet("supply");
      const totalTransactions = statByKeyCacheGet("totalTransactions");
      const lastDayTXs = statByKeyCacheGet("lastDayLSTXs");
      const lastMonthTXs = statByKeyCacheGet("lastMonthLSTXs");
      const lastYearTXs = statByKeyCacheGet("lastYearLSTXs");

      return {
        last24TXs,
        blocks: block.height,
        staked,
        supply,
        totalTransactions,
        totalTransactions30: totalTransactions - LEGACY_CHAIN_TXS_COUNT,
        lastDay: lastDayTXs,
        lastMonth: lastMonthTXs,
        lastYear: lastYearTXs,
      };
    } catch (e) {
      log.error(e);
      sendGraphqlError(new Error("Error fetching the transactions data"));
    }
  },
};
