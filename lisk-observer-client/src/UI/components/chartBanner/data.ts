import { ChartData } from "chart.js";
import { CURRENCY_PAIRS, CURRENCY_SYMBOLS } from "./const";

const totalDuration = 300;
const delayBetweenPoints = totalDuration / 15;
const previousY = (ctx: any) =>
  ctx.index === 0
    ? ctx.chart.scales.y.getPixelForValue(100)
    : ctx.chart
        .getDatasetMeta(ctx.datasetIndex)
        .data[ctx.index - 1].getProps(["y"], true).y;

export const color = "153, 102, 255";

export const chartData = (labels: string[], data: number[]): ChartData => ({
  labels,
  datasets: [
    {
      data,
      backgroundColor: `rgba(${color}, 0.0)`,
      borderColor: `rgba(${color}, 0.8)`,
      pointBorderWidth: 5,
      pointHoverRadius: 10,
      pointHoverBorderWidth: 1,
      pointRadius: 1,
      borderWidth: 4,
      fill: true,
      tension: 0.3,
    },
  ],
});

export const chartOptions = (currency: CURRENCY_PAIRS) => ({
  animations: {
    x: {
      type: "number",
      easing: "linear",
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx: any) {
        if (ctx.type !== "data" || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
    y: {
      type: "number",
      easing: "linear",
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx: any) {
        if (ctx.type !== "data" || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
  },
  interaction: {
    mode: "nearest",
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      padding: 20,
      mode: "nearest",
      backgroundColor: "#000",
      titleFontSize: 16,
      titleFontColor: "#0066ff",
      bodyFontSize: 14,
      displayColors: false,
      callbacks: {
        label: (item: any) => {
          return `${item.raw} ${CURRENCY_SYMBOLS[currency]}`;
        },
      },
    },
  },
  maintainAspectRatio: true,
  responsive: true,
  scales: {
    x: {
      grid: {
        borderWidth: 0,
        lineWidth: 0,
      },
      ticks: {
        display: false,
      },
    },
    y: {
      grid: {
        borderWidth: 0,
        lineWidth: 0,
      },
      ticks: {
        display: false,
      },
    },
  },
});
