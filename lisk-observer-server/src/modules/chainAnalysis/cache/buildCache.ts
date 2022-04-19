import { chainAnalysisCacheSet } from ".";
import { fetchChainAnalysisData } from "../fetchChainAnalysisData";

export const buildChainAnalysisCache = async () => {
  const ChainAnalysisData = await fetchChainAnalysisData();

  chainAnalysisCacheSet(ChainAnalysisData);
};
