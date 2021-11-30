import React, { useContext, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { chartData, chartOptions, color } from "./data";
import { useGetHistoricalPricesQuery } from "../../../generated/graphql";
import { CURRENCY_PAIRS, CURRENCY_SYMBOLS } from "./const";
import { TickerContext } from "../../layouts/BaseLayout";

export const Chart = React.memo(() => {
  const ticker = useContext(TickerContext);
  const { data, error, loading } = useGetHistoricalPricesQuery({
    variables: {
      currency: ticker,
    },
  });
  const options = chartOptions(ticker as CURRENCY_PAIRS);

  const ref = useRef();
  useEffect(() => {
    if (data?.getHistoricalPrices?.value) {
      setTimeout(() => {
        if (ref?.current) {
          const chartRef: any = ref.current;
          const dataset = chartRef.config.data.datasets[0];
          dataset.backgroundColor = `rgba(${color} ,0.3)`;
          chartRef.update();
        }
      }, 500);
    }
  }, [data]);

  if (error || loading) {
    return <>Loading</>;
  }

  const prices: any = data && data.getHistoricalPrices;
  const lastIndex =
    (data?.getHistoricalPrices?.value &&
      data?.getHistoricalPrices?.value?.length - 1) ||
    0;
  const latestValue =
    (data?.getHistoricalPrices?.value &&
      data.getHistoricalPrices.value[lastIndex]) ||
    0;

  return data ? (
    <>
      <div className="stats-card-data-block homepage-price-block">
        <div className="left-block">
          <div className="stats-card-value font-xl force-white-text">
            Price{"  "}
            <span className="font-l">
              {latestValue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 8,
              })}{" "}
              {CURRENCY_SYMBOLS[ticker]}
            </span>
          </div>
        </div>
      </div>
      <Line
        ref={ref}
        id="line-chart"
        type="line"
        data={chartData(prices.date! || [], prices.value! || [])}
        options={options}
      />
    </>
  ) : (
    <></>
  );
});
