import { CronJob } from "cron";
import { logger } from "@modules/log";
import {
  buildAddressesCacheFromDB,
  buildRichListCache,
} from "@modules/accounts/cache/buildCache";
import { timeEnd, timeStart } from "@modules/utils/timeBenchmark";
const log = logger("CRON_ACCOUNTS");

export const rebuildAccountsCron = new CronJob("*/15 * * * * *", async () => {
  const start = timeStart();
  try {
    await buildAddressesCacheFromDB();
  } catch (e) {
    console.log(e);
    log.error("failed rebuild");
  }

  timeEnd(start, "rebuildAccountsCron");
});

export const rebuildRichListCacheCron = new CronJob(
  "*/10 * * * *",
  async () => {
    const start = timeStart();
    try {
      await buildRichListCache();
    } catch (e) {
      console.log(e);
      log.error("failed rebuild");
    }

    timeEnd(start, "rebuildRichListCacheCron");
  }
);
