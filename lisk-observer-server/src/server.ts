import express from "express";
import { graphqlSchema } from "./graphql/schema";
import { root } from "./graphql/resolvers";
import { graphqlHTTP } from "express-graphql";
import { logger } from "@modules/log";
import { liskRocket } from "./lib/liskRocket";
import cors from "cors";
import { buildDelegatesCacheFromCore } from "@modules/delegates/cache/buildCache";
import { initCron } from "@modules/cron";
import { buildCaches } from "@modules/caches";
import { fetchNetworkInfo } from "@modules/network/network";

const log = logger("SERVER");
const port = process.env.SERVER_PORT;
const app = express();

(async () => {
  await buildCaches();
  initCron();
})();

app.get("/", (req, res) => {
  res.write(liskRocket);
  res.end();
});

const setMiddleware = () => {
  app.use(cors());
  app.options("*", cors());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
  app.use(
    "/graphql",
    graphqlHTTP({
      schema: graphqlSchema,
      rootValue: root,

      graphiql: true,
    })
  );
};

setMiddleware();

app.listen(port, async () => {
  log.info(`Running a GraphQL API server at http://localhost:${port}`);
});
