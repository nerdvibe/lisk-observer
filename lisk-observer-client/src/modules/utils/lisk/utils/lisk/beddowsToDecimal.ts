import { Big, BigSource } from "big.js";

export const beddowsToDecimal = (amount: BigSource, round: number = 8) => {
  return Big(amount).div(100000000).round(round);
};
