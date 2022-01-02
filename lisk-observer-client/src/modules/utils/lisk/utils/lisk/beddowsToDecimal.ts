import { Big, BigSource } from "big.js";

export const beddowsToDecimal = (amount: BigSource, round: number = 8) => {
  return Big(amount).div(100000000).round(round);
};

export const displayBigNumber = (amount: string | number) => {
  const expAmount = Big(amount).div(100000000);
  const expNumbers = expAmount.e;
  const fixedValueResult = Big(expAmount)
    .toFixed(expNumbers < 0 ? expNumbers * -1 : expNumbers)
    .toString();
  const hasDecimal = +expAmount.toString().split(".")[1] > 0;
  return hasDecimal
    ? `${(+fixedValueResult.split(".")[0]).toLocaleString()}.${
        expAmount.toString().split(".")[1]
      }`
    : fixedValueResult;
};
