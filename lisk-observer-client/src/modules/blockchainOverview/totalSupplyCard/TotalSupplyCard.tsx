import React from "react";
import { NumberCard } from "../../../UI/components/NumberCard";
import { useQuery } from "@apollo/react-hooks";
import { BLOCK_HEIGHT_QUERY } from "../../../apollo/queries";

const PRE_ONE_LSK_BLOCK_MINED = 142000000; // How many LSK have been mined before 1 LSK per block, including pre-mine
const ONE_LSK_BLOCK_HEIGHT = 13451520; // The height where the block reward became 1 LSK

export const TotalSupplyCard: React.FC = () => {
  const { data, loading, error } = useQuery(BLOCK_HEIGHT_QUERY, {
    fetchPolicy: "cache-only",
  });
  const blockHeight = data?.lastBlock?.height ? data.lastBlock.height : 0;
  // Premined + forged up to 1 LSK/block + ( amount of LSK forged between now and start of 1LSK/block)
  const supply = !blockHeight
    ? "..."
    : PRE_ONE_LSK_BLOCK_MINED + (+blockHeight - ONE_LSK_BLOCK_HEIGHT);
  const readableSupply = supply.toLocaleString();

  return (
    <>
      <NumberCard
        data={`${readableSupply} Ⱡ`}
        icon={"fas fa-angle-double-up"}
        title={"Total Supply"}
        loading={loading}
        error={!!error}
      />
    </>
  );
};
