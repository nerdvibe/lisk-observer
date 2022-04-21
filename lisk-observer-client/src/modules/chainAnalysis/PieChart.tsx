import React from "react";
import { Pie } from "react-chartjs-2";

export const options = {
  maintainAspectRatio: true,
  responsive: true,
  scales: {
    y: {
      display: 0,
      ticks: {
        display: false,
      },
    },
    x: {
      display: 0,
      gridLines: {
        display: false,
      },
      ticks: {
        display: false,
        autoSkip: false,
        maxRotation: 0,
        minRotation: 0,
      },
    },
  },
  interaction: {
    mode: "nearest",
    intersect: true,
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

const PieChart = ({ dataset, labels }: { dataset: any; labels: string[] }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: dataset,
        backgroundColor: ["#7b2cbf", "#e0aaff"],
        borderWidth: 0,
      },
    ],
  };
  return (
    <div className="pie-chart mx-auto">
      <Pie type={"Pie"} options={options} data={data} />
    </div>
  );
};

export default PieChart;
