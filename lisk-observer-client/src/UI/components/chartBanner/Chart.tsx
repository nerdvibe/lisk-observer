import React, { useContext, useEffect, useMemo, useRef } from "react";
import { Line } from "react-chartjs-2";
import { chartData, chartOptions, color } from "./data";
import { useGetHistoricalPricesQuery } from "../../../generated/graphql";
import { CURRENCY_PAIRS, CURRENCY_SYMBOLS } from "./const";
import { TickerContext } from "../../layouts/BaseLayout";
let render = 0;

export const Chart = () => {
  const ref = useRef();
  const ticker = useContext(TickerContext);
  const options = chartOptions(ticker as CURRENCY_PAIRS);
  const { data, error, loading } = useGetHistoricalPricesQuery({
    variables: {
      currency: ticker,
    },
  });
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

  return useMemo(() => {
    const prices: any = data && data.getHistoricalPrices;
    const lastIndex =
      (data?.getHistoricalPrices?.value &&
        data?.getHistoricalPrices?.value?.length - 1) ||
      0;
    const latestValue =
      (data?.getHistoricalPrices?.value &&
        data.getHistoricalPrices.value[lastIndex]) ||
      0;

    if (error || loading || !data) {
      return <>Loading</>;
    }

    return (
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
    );
  }, [error, loading, data]);
};
