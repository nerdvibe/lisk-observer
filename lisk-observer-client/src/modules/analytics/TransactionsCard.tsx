import React, { useState } from "react";
import { StatElement } from "../../generated/graphql";
import { StatsCardChart } from "./StatsCardChart";

interface Props {
  stats: {
    transactions_history: {
      month: StatElement[];
      year: StatElement[];
    };
  };
}

const TransactionsCard = ({ stats }: Props) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const labels = () => {
    switch (selectedOption) {
      case 0:
        return stats.transactions_history.month.map((el) => el.date);
      case 1:
        return stats.transactions_history.year.map((el) => el.date);
    }
  };
  const data = () => {
    switch (selectedOption) {
      case 0:
        return stats.transactions_history.month.map((el) => el.count);
      case 1:
        return stats.transactions_history.year.map((el) => el.count);
    }
  };
  const variation = () => {
    if (stats.transactions_history) {
      const period = selectedOption === 0 ? "month" : "year";
      const index = stats.transactions_history?.[period].length - 1 || 0;
      const firstValue = stats.transactions_history?.[period][index].count || 0;
      const latestValue =
        stats.transactions_history?.[period][index - 1].count || 0;
      return (((firstValue - latestValue) * 100) / firstValue).toFixed(2);
    }
    return 0;
  };
  const latestTransactions = () => {
    const period = selectedOption === 0 ? "month" : "year";
    const index = stats.transactions_history?.[period].length - 1 || 0;
    const firstValue = stats.transactions_history?.[period][index].count || 0;
    return firstValue;
  };

  return (
    <StatsCardChart
      title={"Transactions"}
      value={`${latestTransactions().toLocaleString()}`}
      variation={variation()}
      dropdownOptions={[
        { label: "Daily", value: 0 },
        { label: "Monthly", value: 1 },
      ]}
      chartData={{
        labels: [...(labels() || [])] as string[],
        data: [...(data() || [])] as number[],
      }}
      onDateChange={(value) => setSelectedOption(value)}
      lastMonthLabel={selectedOption === 1}
    />
  );
};

export default TransactionsCard;
