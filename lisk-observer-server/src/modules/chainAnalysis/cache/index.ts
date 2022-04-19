import NodeCache from "node-cache";
import { ChainAnalysisData } from "../types";

export const chainAnalysis = new NodeCache();
const chainAnalysisKey = "CHAIN_ANALYSIS";

export const chainAnalysisCacheSet = async (value: ChainAnalysisData) => {
  await chainAnalysis.set(chainAnalysisKey, value);
};

export const chainAnalysisCacheGet = (): ChainAnalysisData => {
  return chainAnalysis.get(chainAnalysisKey);
};
