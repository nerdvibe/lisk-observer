import React from "react";
import { useLastDayTxQuery } from "../../../generated/graphql";
import { NumberCard } from "../../../UI/components/NumberCard";

export const TxLastDayCard: React.FC = () => {
  const { data, loading, error } = useLastDayTxQuery({
    pollInterval: 60000,
  });

  const totalTxCount = data?.txStats?.lastDay ? data.txStats.lastDay : 0;

  return (
    <>
      <NumberCard
        data={totalTxCount.toLocaleString()}
        icon={"fas fa-angle-double-up"}
        title={"Transactions in the last 24h"}
        loading={loading}
        error={!!error}
      />
    </>
  );
};
