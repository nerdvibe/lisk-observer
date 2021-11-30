import NodeCache from "node-cache";

export const transactionStats = new NodeCache();

export const statCacheSet = async (
  period:
    | "count24hTXs"
    | "lastDayVolume"
    | "lockedAmount"
    | "supply"
    | "totalTransactions"
    | "lastDayLSTXs"
    | "lastMonthLSTXs"
    | "lastYearLSTXs",
  value: any
) => {
  await transactionStats.set(period, value);
};

export const statByKeyCacheGet = (
  period:
    | "count24hTXs"
    | "lastDayVolume"
    | "lockedAmount"
    | "supply"
    | "totalTransactions"
    | "lastDayLSTXs"
    | "lastMonthLSTXs"
    | "lastYearLSTXs"
): any | undefined => {
  return transactionStats.get(period);
};
