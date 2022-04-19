import { CronJob } from "cron";
import { logger } from "@modules/log";
import { timeEnd, timeStart } from "@modules/utils/timeBenchmark";
import { buildExchangePricesCache } from "@modules/exchanges/cache/buildCache";
const log = logger("CRON_EXCHANGES_CACHE");

export const rebuildExchangesCron = new CronJob("* * * * *", async () => {
  // every minute
  const start = timeStart();
  try {
    await buildExchangePricesCache();
  } catch (e) {
    console.log(e);
    log.error("failed rebuild");
  }
  timeEnd(start, "rebuildExchangesCron");
});
