import React from "react";
import { NumberCard } from "../../../UI/components/NumberCard";
import { useBlockHeightQuery } from "../../../generated/graphql";

export const BlockHeightFinalizedCard: React.FC = () => {
  const { data, loading, error } = useBlockHeightQuery({
    fetchPolicy: "cache-only",
  });

  const blockHeight = data?.lastBlock?.finalized || 0;

  return (
    <>
      <NumberCard
        data={(+blockHeight).toLocaleString()}
        icon={"fas fa-angle-double-up"}
        title={"Finalized Blockheight"}
        loading={loading}
        error={!!error}
      />
    </>
  );
};
