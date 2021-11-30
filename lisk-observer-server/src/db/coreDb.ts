import Knex, { Knex as KnexTypes } from "knex";
import { attachPaginate } from "knex-paginate";
const config: KnexTypes.Config = {
  client: "mysql",
  connection: process.env.MYSQL_URI,
};

export const coreDb = Knex(config);
attachPaginate();

export { Knex };
