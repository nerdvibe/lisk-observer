import dotenv from "dotenv";
dotenv.config();
import "module-alias/register";
import "./db";
import "./server";

import { logger } from "@modules/log";
import { liskRocket } from "./lib/liskRocket";

const log = logger("APP");

const graceful = async () => {
  log.info("\n\nBye!");
  // gracefully exit processes here:
  process.exit(0);
};
process.on("SIGTERM", graceful);
process.on("SIGINT", graceful);

log.info(`

${liskRocket}
        
Lisk Observer
Observing Lisk since 2019
`);
