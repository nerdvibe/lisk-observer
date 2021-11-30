import { CronJob } from "cron";
import { logger } from "@modules/log";
import { timeEnd, timeStart } from "@modules/utils/timeBenchmark";
import { buildNetworkCache } from "@modules/network/cache/buildCache";
const log = logger("CRON_NETWORK_CACHE");

export const rebuildNetworkCron = new CronJob("*/30 * * * *", async () => {
  // every 30 minutes
  const start = timeStart();
  try {
    await buildNetworkCache();
  } catch (e) {
    console.log(e);
    log.error("failed rebuild");
  }
  timeEnd(start, "rebuildNetworkCron");
});
