import axios from "axios";

export const transactionsStatsLastDay = async () => {
  const { data: LSStats } = await axios.get(
    `${process.env.LISK_SERVICE_URL}/transactions/statistics/day?offset=0&limit=1`,
    {
      timeout: 2000000,
    }
  );

  return processLSresponse(LSStats, "LAST_DAY");
};

export const transactionsStatsMonth = async () => {
  const { data: LSStats } = await axios.get(
    `${process.env.LISK_SERVICE_URL}/transactions/statistics/day?offset=0&limit=30`,
    {
      timeout: 2000000,
    }
  );

  return processLSresponse(LSStats, "LAST_MONTH");
};

export const transactionsStatsYear = async () => {
  const { data: LSStats } = await axios.get(
    `${process.env.LISK_SERVICE_URL}/transactions/statistics/month?offset=0&limit=12`,
    {
      timeout: 2000000,
    }
  );

  return processLSresponse(LSStats, "LAST_YEAR");
};

const processLSresponse = (
  LSStats: any,
  kind: "LAST_MONTH" | "LAST_YEAR" | "LAST_DAY"
) => {
  const historicalTXs = LSStats.data.timeline
    .map((item: any) => {
      return {
        date: item.date,
        count: item.transactionCount,
        volume: item.volume,
      };
    })
    .reverse();

  const txKinds = {
    transfers: LSStats.data.distributionByType["2:0"] || 0,
    votes: LSStats.data.distributionByType["5:1"] || 0,
    poms: LSStats.data.distributionByType["5:3"] || 0,
    registerDelegate: LSStats.data.distributionByType["5:0"] || 0,
    unlockToken: LSStats.data.distributionByType["5:2"] || 0,
  };
  const totalCount = historicalTXs.reduce((acc, curr) => acc + curr.count, 0);
  const totalVolume = historicalTXs.reduce((acc, curr) => acc + curr.volume, 0);
  const distributionByType = LSStats.data.distributionByType;
  const distributionByAmount = LSStats.data.distributionByAmount;

  return {
    historicalTXs,
    totalCount,
    totalVolume,
    distributionByType,
    distributionByAmount,
    txKinds,
    kind,
  };
};
