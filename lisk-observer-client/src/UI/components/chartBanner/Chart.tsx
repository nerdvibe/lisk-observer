import React, { useContext, useEffect, useMemo, useRef } from "react";
import { Line } from "react-chartjs-2";
import { chartData, chartOptions, color } from "./data";
import {
  Currencies,
  useGetHistoricalPricesQuery,
} from "../../../generated/graphql";
import { CURRENCY_PAIRS, CURRENCY_SYMBOLS } from "./const";
import { TickerContext, TickerValueContext } from "../../layouts/BaseLayout";
import moment from "moment";

export const Chart = () => {
  const ref = useRef();
  const ticker = useContext(TickerContext);
  const {
    data: pricesData,
    loading: pricesLoading,
    error: pricesError,
  }: any = React.useContext(TickerValueContext);
  const nowDate = moment(new Date()).format("DD-MMM-YYYY");
  const options = chartOptions(ticker as CURRENCY_PAIRS);
  const { data, error, loading } = useGetHistoricalPricesQuery({
    variables: {
      currency: (ticker as unknown) as Currencies,
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

    if (error || loading || !data || pricesLoading || pricesError) {
      return <>Loading</>;
    }
    const chartLabels = [...prices.value!, pricesData.lastTicks[ticker]] || [];
    const chartValues = [...prices.date!, nowDate] || [];

    return (
      <>
        <div className="stats-card-data-block homepage-price-block">
          <div className="left-block">
            <div className="stats-card-value font-xl force-white-text">
              Price{"  "}
              <span className="font-l">
                {pricesData.lastTicks[ticker].toLocaleString("en-US", {
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
          data={chartData(chartValues, chartLabels)}
          options={options}
        />
      </>
    );
  }, [error, loading, data]);
};
