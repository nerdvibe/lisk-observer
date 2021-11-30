import { networkCacheGet } from "../cache";

export const queries = {
  networkInfo: async () => {
    return networkCacheGet();
  },
};
