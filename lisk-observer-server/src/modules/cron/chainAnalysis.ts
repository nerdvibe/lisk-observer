import { CronJob } from "cron";
import { logger } from "@modules/log";
import { timeEnd, timeStart } from "@modules/utils/timeBenchmark";
import { buildChainAnalysisCache } from "@modules/chainAnalysis/cache/buildCache";
const log = logger("CRON_CHAINANALYSIS_CACHE");

export const rebuildChainAnalysisCron = new CronJob("* * * * *", async () => {
  // every minute
  const start = timeStart();
  try {
    await buildChainAnalysisCache();
  } catch (e) {
    console.log(e);
    log.error("failed rebuild");
  }
  timeEnd(start, "rebuildChainAnalysisCron");
});
