import { CronJob } from "cron";
import { logger } from "@modules/log";
import { timeEnd, timeStart } from "@modules/utils/timeBenchmark";
import {
  buildFiatPricesCache,
  buildLastPricesCache,
  buildPricesCache,
} from "@modules/prices/cache/buildCache";
const log = logger("CRON_PRICES");

export const rebuildFiatPricesCron = new CronJob("* 0 0 * * *", async () => {
  const start = timeStart();
  try {
    await buildFiatPricesCache();
  } catch (e) {
    console.log(e);
    log.error("rebuildFiatPricesCron failed rebuild");
  }
  timeEnd(start, "rebuildFiatPricesCron");
});

export const rebuildPricesCron = new CronJob("*/15 * * * * *", async () => {
  const start = timeStart();
  try {
    await buildPricesCache();
  } catch (e) {
    console.log(e);
    log.error("rebuildPricesCron failed rebuild");
  }
  timeEnd(start, "rebuildPricesCron");
});

export const rebuildLastTicksCron = new CronJob("*/10 * * * * *", async () => {
  const start = timeStart();
  try {
    await buildLastPricesCache();
  } catch (e) {
    console.log(e);
    log.error("rebuildLastTicksCron failed rebuild");
  }
  timeEnd(start, "rebuildLastTicksCron");
});
