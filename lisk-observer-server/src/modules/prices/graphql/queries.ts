import { sendGraphqlError } from "../../../graphql/util";
import { SUPPORTED_CURRENCIES } from "@modules/prices/const";
import {
  historicalPricesByCurrencyCacheGet,
  lastPricesCacheGet,
} from "@modules/prices/cache";

export const queries = {
  getHistoricalPrices: async ({ currency }: any) => {
    if (!Object.values(SUPPORTED_CURRENCIES).includes(currency)) {
      sendGraphqlError(new Error("Currency not supported"));
    }

    return historicalPricesByCurrencyCacheGet(currency);
  },
  lastTicks: async () => {
    return lastPricesCacheGet();
  },
};
