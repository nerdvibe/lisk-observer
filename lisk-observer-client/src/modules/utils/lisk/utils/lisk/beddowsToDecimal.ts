import { Big, BigSource } from "big.js";

export const beddowsToDecimal = (amount: BigSource, round: number = 8) => {
  return Big(amount).div(100000000).round(round);
};

export const displayBigNumber = (amount: string | number) => {
  const expAmount = Big(amount).div(100000000);
  const expNumbers = expAmount.e;
  const fixedValueResult =
    expNumbers !== 0
      ? Big(expAmount).toFixed(Math.abs(expNumbers))
      : expAmount.toString();
  const hasDecimal = +expAmount.toString().split(".")[1] > 0;
  const intNumber = fixedValueResult.split(".")[0];
  const absIntNumber = Math.abs(+intNumber);
  return hasDecimal
    ? `${absIntNumber.toLocaleString()}.${expAmount.toString().split(".")[1]}`
    : Math.abs(+fixedValueResult).toLocaleString();
};
