import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({
  dataset,
  labels,
  height,
}: {
  dataset: any;
  labels: (string | string[])[];
  height?: number;
}) => {
  const options = {
    maintainAspectRatio: true,
    responsive: true,
    scales: {
      y: {
        type: "logarithmic",
        ticks: {
          display: true,
          color: "rgba(255, 255, 255, 1)",
          suggestedMin: 0, // minimum will be 0, unless there is a lower value.
          beginAtZero: true,
          labelOffset: 10,
        },
        grid: {
          display: false,
          borderColor: "#ffffff00",
        },
      },
      x: {
        grid: {
          display: false,
          borderColor: "#ffffff00",
        },
        ticks: {
          beginAtZero: true,
          display: true,
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          color: "rgba(255, 255, 255, 1)",
          align: "center",
        },
      },
    },
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        padding: 20,
        mode: "nearest",
        backgroundColor: "#00000088",
        titleFontSize: 16,
        titleFontColor: "#0066ff",
        bodyFontSize: 14,
        displayColors: false,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: dataset,
        backgroundColor: [
          "#ff7b00",
          "#ff8800",
          "#ff9500",
          "#ffa200",
          "#ffaa00",
          "#ffb700",
          "#ffc300",
          "#ffd000",
          "#ffdd00",
          "#ffea00",
        ],
        borderWidth: 0,
        borderRadius: 10,
      },
    ],
  };
  return (
    <>
      <Bar type={"bar"} options={options} data={data} height={height} />
    </>
  );
};

export default BarChart;
