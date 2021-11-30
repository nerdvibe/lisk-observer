import { CronJob } from "cron";
import { logger } from "@modules/log";
import {
  buildDelegatesCacheFromCore,
  buildDelegatesPromisesCache,
} from "@modules/delegates/cache/buildCache";
import { timeEnd, timeStart } from "@modules/utils/timeBenchmark";
const log = logger("CRON_DELEGATES");

export const rebuildDelegatesCron = new CronJob("*/15 * * * * *", async () => {
  const start = timeStart();
  try {
    await buildDelegatesCacheFromCore();
  } catch (e) {
    console.log(e);
    log.error("failed rebuild");
  }
  timeEnd(start, "rebuildDelegatesCron");
});

export const rebuildDelegatesPromisesCron = new CronJob(
  "0 0 */2 * * *",
  async () => {
    const start = timeStart();
    try {
      await buildDelegatesPromisesCache();
    } catch (e) {
      console.log(e);
      log.error("failed rebuild");
    }
    timeEnd(start, "buildDelegatesPromisesCache");
  }
);
