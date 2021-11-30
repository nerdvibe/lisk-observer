import { CronJob } from "cron";
import { logger } from "@modules/log";
import { timeEnd, timeStart } from "@modules/utils/timeBenchmark";
import {
  buildFinalizedHeightCache,
  buildLastBlockCache,
} from "@modules/blocks/cache/buildCache";
const log = logger("CRON_HEIGHTS_CACHe");

export const rebuildHeightsCacheCron = new CronJob(
  "*/5 * * * * *",
  async () => {
    const start = timeStart();
    try {
      await buildFinalizedHeightCache();
      await buildLastBlockCache();
    } catch (e) {
      console.log(e);
      log.error("failed rebuild");
    }
    timeEnd(start, "buildFinalizedHeightCache");
  }
);
