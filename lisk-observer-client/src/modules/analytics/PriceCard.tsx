import React, { useContext } from "react";
import { useGetHistoricalPricesQuery } from "../../generated/graphql";
import { CURRENCY_SYMBOLS } from "../../UI/components/chartBanner/const";
import { TickerContext } from "../../UI/layouts/BaseLayout";
import { IsErrorOrLoading } from "../utils/IsErrorOrLoading";
import { StatsCardChart } from "./StatsCardChart";

const PriceCard = () => {
  const ticker = useContext(TickerContext);
  const currency = CURRENCY_SYMBOLS[ticker];
  const { data, error, loading } = useGetHistoricalPricesQuery({
    variables: {
      currency: ticker,
    },
  });

  const lastIndex =
    (data?.getHistoricalPrices?.value &&
      data?.getHistoricalPrices?.value?.length - 1) ||
    0;
  const latestValue =
    (data?.getHistoricalPrices?.value &&
      data.getHistoricalPrices.value[lastIndex]) ||
    0;
  const initialValue =
    (data?.getHistoricalPrices?.value &&
      data?.getHistoricalPrices?.value[lastIndex - 1]) ||
    0;

  const price_variation = (
    ((latestValue - initialValue) * 100) /
    initialValue
  ).toFixed(2);

  if (error || loading || !data?.getHistoricalPrices?.value) {
    return (
      <div className="content">
        <IsErrorOrLoading error={!!error} title={"Price"} />
      </div>
    );
  }

  return (
    <StatsCardChart
      title={"Price"}
      value={`${latestValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 8,
      })} ${currency}`}
      variation={price_variation}
      chartColor={""}
      bigCard
      chartData={{
        // @ts-ignore
        labels: data?.getHistoricalPrices?.date! || [],
        // @ts-ignore
        data: data?.getHistoricalPrices?.value! || [],
      }}
      currency={currency}
    />
  );
};

export default PriceCard;
