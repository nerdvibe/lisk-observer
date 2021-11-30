import React, { useState } from "react";
import { StatElement } from "../../generated/graphql";
import { beddowsToDecimal } from "../utils/lisk/utils/lisk/beddowsToDecimal";
import { StatsCard } from "./StatsCard";

interface Props {
  stats: {
    transactions_history: {
      month: StatElement[];
      year: StatElement[];
      latestValue: number;
      lastMonth: number;
      lastYear: number;
    };
  };
}

const TransactionsVolumeCard = ({ stats }: Props) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const variation = () => {
    if (stats.transactions_history) {
      const period = selectedOption === 0 ? "month" : "year";
      const index = stats.transactions_history?.[period].length - 2 || 0;
      const firstValue =
        stats.transactions_history?.[period][index].volume || 0;
      const latestValue = stats.transactions_history?.[period][0].volume || 0;
      return (((firstValue - latestValue) * 100) / firstValue).toFixed(2);
    }
    return 0;
  };
  const latestTransactions = () => {
    const period =
      selectedOption === 1
        ? "lastMonth"
        : selectedOption === 2
        ? "lastYear"
        : "latestValue";
    return +stats.transactions_history?.[period] || 0;
  };

  return (
    <StatsCard
      title={"Transactions volume"}
      value={`${(+beddowsToDecimal(
        latestTransactions()
      )).toLocaleString()} LSK`}
      variation={variation()}
      icon={<div className="white-text tx-volume-card-symbol">Ⱡ</div>}
      dropdownOptions={[
        { label: "Last day", value: 0 },
        { label: "Last month", value: 1 },
        { label: "Last year", value: 2 },
      ]}
      onDateChange={(value) => setSelectedOption(value)}
    />
  );
};

export default TransactionsVolumeCard;
