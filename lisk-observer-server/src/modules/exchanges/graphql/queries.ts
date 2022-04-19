import { exchangePricesCacheGet } from "../cache";

export const queries = {
  marketData: async () => {
    const data = exchangePricesCacheGet();
    return data;
  },
};
