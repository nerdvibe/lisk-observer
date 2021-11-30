import { sendGraphqlError } from "../../../graphql/util";
import { logger } from "@modules/log";
import { timeEnd, timeStart } from "@modules/utils/timeBenchmark";
import { searchAccount } from "@modules/search/searchAccount";
import { searchTransaction } from "@modules/search/searchTransaction";
import { searchBlock } from "@modules/search/searchBlock";

const log = logger("SEARCH");

export const queries = {
  search: async ({ term }) => {
    const start = timeStart();

    if (!term.length) {
      return {
        accounts: [],
        transactions: [],
        blocks: [],
      };
    }

    try {
      const [accounts, transactions, blocks] = await Promise.all([
        searchAccount(term),
        searchTransaction(term),
        searchBlock(term),
      ]);

      const result = {
        accounts: accounts,
        transactions: transactions,
        blocks: blocks,
      };

      timeEnd(start, `search_query term: ${term}`, 4);

      return result;
    } catch (e) {
      log.error(e);
      sendGraphqlError(new Error("Error fetching the account data"));
    }
  },
};
