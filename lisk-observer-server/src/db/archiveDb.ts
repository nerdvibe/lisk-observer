import Knex, { Knex as KnexTypes } from "knex";
const config: KnexTypes.Config = {
  client: "pg",
  connection: process.env.POSTGRES_URI,
};

export const archiveDb = Knex(config);

export { Knex };
