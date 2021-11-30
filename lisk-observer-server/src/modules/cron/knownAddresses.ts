import { CronJob } from "cron";
import { logger } from "@modules/log";
import { timeEnd, timeStart } from "@modules/utils/timeBenchmark";
import { buildKnownAddressesCacheFromDB } from "@modules/knownAddresses/cache/buildCache";
const log = logger("CRON_STATS");

export const rebuildKnownAddressesCron = new CronJob(
  "*/30 * * * * *",
  async () => {
    const start = timeStart();
    try {
      await buildKnownAddressesCacheFromDB();
    } catch (e) {
      console.log(e);
      log.error("failed rebuild");
    }
    timeEnd(start, "rebuildKnownAddressesCron");
  }
);
