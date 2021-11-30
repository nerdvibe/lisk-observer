import { liskConfig } from "./lisk/config";

export interface Config {
  TOTAL_AMOUNT: number;
  MILESTONES: string[];
  OFFSET: number;
  DISTANCE: number;
}
export interface Configs {
  lisk: {
    mainnet: Config;
    testnet: Config;
  };
}

export const configs: Configs = {
  lisk: { ...liskConfig },
};
