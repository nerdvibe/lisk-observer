import { CronJob } from "cron";
import { logger } from "@modules/log";
import { timeEnd, timeStart } from "@modules/utils/timeBenchmark";
import { buildTransactionsStatCacheFromDB } from "@modules/stats/cache/buildCache";
const log = logger("CRON_HEIGHTS_CACHE");

export const rebuildStatsCacheCron = new CronJob("*/30 * * * * *", async () => {
  const start = timeStart();
  try {
    await buildTransactionsStatCacheFromDB();
  } catch (e) {
    console.log(e);
    log.error("failed rebuild");
  }
  timeEnd(start, "buildTransactionsStatCacheFromDB");
});
