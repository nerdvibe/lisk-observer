import { IconProp } from "@fortawesome/fontawesome-svg-core";
import React, { useState } from "react";
import { StatsCard } from "./StatsCard";

interface Props {
  label: string;
  stats: {
    latestValue: number;
    month: number;
    year: number;
  };
  icon: IconProp;
}

const TXKindsCard = ({ stats, label, icon }: Props) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const getValue = () => {
    if (stats) {
      const period =
        selectedOption === 1
          ? "month"
          : selectedOption === 2
          ? "year"
          : "latestValue";
      return stats[period] || 0;
    }
    return 0;
  };

  return (
    <StatsCard
      title={label}
      value={getValue().toLocaleString()}
      icon={icon}
      dropdownOptions={[
        { label: "Last day", value: 0 },
        { label: "Last month", value: 1 },
        { label: "Last year", value: 2 },
      ]}
      onDateChange={(value) => setSelectedOption(value)}
    />
  );
};

export default TXKindsCard;
