import moment from "moment";
import React, { useContext } from "react";
import { useGetHistoricalPricesQuery } from "../../generated/graphql";
import { CURRENCY_SYMBOLS } from "../../UI/components/chartBanner/const";
import { TickerContext, TickerValueContext } from "../../UI/layouts/BaseLayout";
import { IsErrorOrLoading } from "../utils/IsErrorOrLoading";
import { StatsCardChart } from "./StatsCardChart";

const PriceCard = () => {
  const ticker = useContext(TickerContext);
  const currency = CURRENCY_SYMBOLS[ticker];
  const nowDate = moment(new Date()).format("DD-MMM-YYYY");
  const { data, error, loading } = useGetHistoricalPricesQuery({
    variables: {
      currency: ticker,
    },
  });
  const {
    data: pricesData,
    loading: pricesLoading,
    error: pricesError,
  }: any = React.useContext(TickerValueContext);

  const lastIndex =
    (data?.getHistoricalPrices?.value &&
      data?.getHistoricalPrices?.value?.length - 1) ||
    0;
  const initialValue =
    (data?.getHistoricalPrices?.value &&
      data?.getHistoricalPrices?.value[lastIndex - 1]) ||
    0;

  const price_variation = (
    ((pricesData.lastTicks[ticker] - initialValue) * 100) /
    initialValue
  ).toFixed(2);

  if (
    error ||
    loading ||
    !data?.getHistoricalPrices?.value ||
    pricesLoading ||
    pricesError
  ) {
    return (
      <div className="content">
        <IsErrorOrLoading error={!!error} title={"Price"} />
      </div>
    );
  }
  const chartLabels = [...data?.getHistoricalPrices?.date!, nowDate] || [];
  const chartValues =
    [...data?.getHistoricalPrices?.value!, pricesData.lastTicks[ticker]] || [];

  return (
    <StatsCardChart
      title={"Price"}
      value={`${pricesData.lastTicks[ticker].toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 8,
      })} ${currency}`}
      variation={price_variation}
      chartColor={""}
      bigCard
      chartData={{
        // @ts-ignore
        labels: chartLabels,
        // @ts-ignore
        data: chartValues,
      }}
      currency={currency}
    />
  );
};

export default PriceCard;
