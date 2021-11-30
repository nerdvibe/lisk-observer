import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap";
const color = "#FFFFFF";

interface Props {
  title: string;
  value: any;
  chartData?: ChartData;
  variation?: string | number;
  variationColor?: "red" | "green" | "neutral";
  chartColor?: string;
  dropdownOptions?: any[];
  bigCard?: boolean;
  onDateChange?: (option: number) => void;
  lastMonthLabel?: boolean;
  currency?: string;
}

interface ChartData {
  labels: string[];
  data: number[];
}

export const StatsCardChart = ({
  title,
  value,
  variation,
  variationColor,
  chartColor,
  dropdownOptions,
  bigCard,
  chartData,
  onDateChange,
  lastMonthLabel,
  currency,
}: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [option, setOption] = useState(
    dropdownOptions ? dropdownOptions[0] : ""
  );

  const data = useCallback(
    (canvas: any) => {
      var ctx = canvas.getContext("2d");
      var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
      gradientStroke.addColorStop(0, "#80b6f4");
      gradientStroke.addColorStop(1, color);
      var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
      gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
      gradientFill.addColorStop(1, chartColor || "rgba(249, 99, 59, 0.40)");
      const labels = [...(chartData?.labels || [])];
      const data = [...(chartData?.data || [])];
      return {
        labels,
        datasets: [
          {
            borderColor: chartColor || "#f96332",
            pointBorderColor: "#FFF",
            pointBackgroundColor: "#f96332",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 0,
            tension: 0.4,
            fill: true,
            backgroundColor: gradientFill,
            borderWidth: 2,
            data,
          },
        ],
      };
    },
    [chartColor, chartData]
  );

  const options = (currency?: string) => {
    return {
      maintainAspectRatio: true,
      responsive: true,
      legend: {
        display: false,
      },
      scales: {
        y: {
          display: 0,
          ticks: {
            display: false,
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false,
            color: "rgba(0, 0, 0, 0)",
          },
        },
        x: {
          display: 0,
          ticks: {
            display: false,
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false,
            color: "rgba(0, 0, 0, 0)",
          },
        },
      },
      layout: {
        padding: { left: 0, right: 0, top: 15, bottom: 15 },
      },
      interaction: {
        mode: "nearest",
        intersect: false,
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (item: any) => {
              return `${item.raw} ${currency ? currency : ""}`;
            },
          },
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
  };

  const dropdown = useCallback(() => {
    const handleOptionUpdate = (value: number, label: string) => {
      onDateChange && onDateChange(value);
      setOption({ value, label });
    };
    if (!dropdownOptions) return <></>;
    return (
      <Dropdown
        isOpen={showDropdown}
        toggle={() => setShowDropdown(!showDropdown)}
        className="days-dropdown bg-none"
      >
        <DropdownToggle caret>
          {option.label}
          <FontAwesomeIcon
            icon={["fas", "angle-down"]}
            className="pointer float-right mt-1 ml-4 dropdown-icon"
          />
        </DropdownToggle>
        {showDropdown && (
          <DropdownMenu>
            {dropdownOptions?.map(({ label, value }) => {
              return (
                <DropdownItem
                  className="pointer"
                  onClick={() => handleOptionUpdate(value, label)}
                >
                  {label}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        )}
      </Dropdown>
    );
  }, [dropdownOptions, onDateChange, option.label, showDropdown]);

  const calculateVariationColor =
    variation &&
    (+variation === 0 ? "neutral" : +variation > 0 ? "green" : "red");

  return useMemo(() => {
    return (
      <Card className={`stats-card-container ${bigCard ? "big-card" : ""}`}>
        <CardHeader>
          {dropdownOptions ? (
            <Row>
              <Col xs={8}>
                <CardTitle tag="h3">{title}</CardTitle>
              </Col>
              <Col xs={4}>{dropdown()}</Col>
            </Row>
          ) : (
            <CardTitle tag="h3">{title}</CardTitle>
          )}
        </CardHeader>
        <CardBody className={`stats-card ${bigCard ? "big-stats-card" : ""}`}>
          <div className="stats-card-hover-data">
            <div className="stats-card-data-block">
              <div className="stats-card-value">{value}</div>
              {variation && (
                <span>
                  <span
                    className={`stats-card-variation variation-${
                      variationColor || calculateVariationColor
                    }`}
                  >
                    {variation}%
                  </span>
                  {"  "}
                  <span className="stats-card-variation-label pl-1">
                    from {lastMonthLabel ? "last month" : "yesterday"}
                  </span>
                </span>
              )}
            </div>
          </div>
          <Line
            className="stats-card-chart"
            data={data}
            options={options(currency)}
            type
            height={bigCard ? 400 : 300}
          />
        </CardBody>
      </Card>
    );
  }, [
    bigCard,
    calculateVariationColor,
    currency,
    data,
    dropdown,
    dropdownOptions,
    lastMonthLabel,
    title,
    value,
    variation,
    variationColor,
  ]);
};
