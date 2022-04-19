import { logger } from "@modules/log";
import axios from "axios";
import { ChainAnalysisData } from "./types";
const log = logger("FETCH_CHAIN_ANALYSIS");

export const fetchChainAnalysisData = async (): Promise<ChainAnalysisData> => {
  try {
    const { data } = await axios.get(`${process.env.CHAIN_ANALYSIS_URL}`);
    return data;
  } catch (e) {
    log.error(`caching failed ${JSON.stringify(e, null, 2)}`);
    return null;
  }
};
