import { coreDb } from "../../../db";
import { statCacheSet } from "@modules/stats/cache/index";
import { calculateTotalSupply } from "@modules/utils/supply";
import {
  transactionsStatsLastDay,
  transactionsStatsMonth,
  transactionsStatsYear,
} from "@modules/stats/transactions";

export const LEGACY_CHAIN_TXS_COUNT = 3784045;

export const buildTransactionsStatCacheFromDB = async () => {
  const now = new Date();
  const yesterday = new Date();
  const yesterdayUnix = yesterday.setDate(yesterday.getDate() - 1);
  const nowUnix = now.getTime();

  const txsLast24h = await coreDb("transactions")
    .where("timestamp", ">", yesterdayUnix / 1000)
    .andWhere("timestamp", "<", nowUnix / 1000)
    .count("id as total")
    .first();

  const totalTransactions = await coreDb("transactions")
    .count("id as total")
    .first();

  const lockedResultQuery = await coreDb("votes_aggregate")
    .sum("amount")
    .first();
  const lockedAmount = Object.values(lockedResultQuery)[0];
  const supply = calculateTotalSupply();

  const lastMonthLSTXs = await transactionsStatsMonth();
  const lastYearLSTXs = await transactionsStatsYear();
  const lastDayLSTXs = await transactionsStatsLastDay();

  await statCacheSet("count24hTXs", txsLast24h.total);

  await statCacheSet("lockedAmount", lockedAmount);
  await statCacheSet("supply", supply);
  await statCacheSet(
    "totalTransactions",
    +totalTransactions.total + LEGACY_CHAIN_TXS_COUNT
  );

  await statCacheSet("lastMonthLSTXs", lastMonthLSTXs);
  await statCacheSet("lastYearLSTXs", lastYearLSTXs);
  await statCacheSet("lastDayLSTXs", lastDayLSTXs);
};
