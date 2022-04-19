import { chainAnalysisCacheGet } from "../cache";

export const queries = {
  chainAnalysis: async () => {
    const data = chainAnalysisCacheGet();
    return data;
  },
};
