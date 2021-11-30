import { CronJob } from "cron";
import {logger} from "@modules/log";
import {buildTransactionsStatCacheFromDB} from "@modules/stats/cache/buildCache";
import {timeEnd, timeStart} from "@modules/utils/timeBenchmark";
const log = logger("CRON_STATS");


export const rebuildStatsCron = new CronJob("*/15 * * * * *", async () => {
  const start = timeStart();
  try {
    await buildTransactionsStatCacheFromDB();
  } catch(e) {
    console.log(e);
    log.error('failed rebuild')
  }
  timeEnd(start,  'rebuildStatsCron')
});
