import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import { useMemo } from "react";
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
import { useChainAnalysisQuery } from "../../generated/graphql";
import { IsErrorOrLoading } from "../utils/IsErrorOrLoading";
import { beddowsToDecimal } from "../utils/lisk/utils/lisk/beddowsToDecimal";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import "./style.css";

const dropdownOptions = [
  { label: "Overall", value: 1 },
  { label: "Hour", value: 2 },
  { label: "Day", value: 3 },
  { label: "Week", value: 4 },
  { label: "Month", value: 5 },
];

const transactionsChartLabels = {
  transfer: "Transfer",
  vote: "Vote",
  tokenunlock: ["Token", "Unlock"],
  delegateregister: ["Delegate", "Registration"],
  multisigregister: ["Multi-sig", "Registration"],
  delegatemisbehavior: ["Delegate", "Misbehavior"],
  reclaimlsk: ["LSK", "Reclaim"],
};

const sentReceivedChartLabels = {
  amounttransferredtoexchanges: "To Exchanges",
  amounttransferredfromexchanges: "From Exchanges",
  amounttransferrednonexchanges: "Non Exchanges",
};

const activeInactiveChartLabels = {
  activeaddresses: "Active",
  inactiveaddresses: "Inactive",
};

const feesChartLabels = {
  totalrewards: "Amount Forged",
  totalfees: "Amount of Fees",
  totalburned: "Amount Burned",
};

const ChainAnalysis: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState<any>();
  const [option, setOption] = useState<{ label: string; value: number }>(
    dropdownOptions ? dropdownOptions[0] : { label: "overall", value: 1 }
  );
  const { data: queryData, loading, error } = useChainAnalysisQuery();

  useEffect(() => {
    if (
      queryData?.chainAnalysis &&
      option.value > 0 &&
      option.value < dropdownOptions.length
    ) {
      // @ts-ignore
      setData(queryData?.chainAnalysis[option.label.toLowerCase()]);
    }
  }, [option, queryData]);

  const dropdown = useCallback(() => {
    const handleOptionUpdate = (value: number, label: string) => {
      setOption({ value, label });
    };
    if (!dropdownOptions) return <></>;
    return (
      <Dropdown
        isOpen={showDropdown}
        toggle={() => setShowDropdown(!showDropdown)}
        className="days-dropdown bg-none"
      >
        <DropdownToggle caret className="w-100">
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
  }, [dropdownOptions, showDropdown]);

  const createDataset = (labels: any) => {
    const dataset: number[] = [];
    if (data) {
      Object.keys(labels).forEach((key) => {
        if (key && (data[key] || data[key] === 0)) {
          dataset.push(data[key]);
        }
      });
    }
    return dataset;
  };

  return useMemo(() => {
    if (error || loading || (!loading && !queryData?.chainAnalysis)) {
      return (
        <div className="content">
          <IsErrorOrLoading
            error={!!error || (!loading && !queryData?.chainAnalysis)}
            title={"Chain analysis"}
          />
        </div>
      );
    }

    return (
      <div className="content">
        <div className="w-100 spaced-values mb-4">
          <div>
            <h4 className="mb-0">Chain analysis</h4>
            <h5 className="mb-0">Data provided by lisk.support</h5>
          </div>
          <div>{dropdown()}</div>
        </div>
        <Card className="card-chart">
          <CardHeader>
            <CardTitle tag="h2">
              <strong> Number of Transactions</strong>
            </CardTitle>
            <CardBody className="">
              <Row>
                <Col md={6} xs={12}>
                  <Row className="h-100 ">
                    <Col xs={12}>
                      <div className="spaced-values">
                        <strong>All</strong>
                        <div>{data?.all! || 0}</div>
                      </div>
                    </Col>
                    {createDataset(transactionsChartLabels).map(
                      (val, index) => {
                        const dataLabel = Object.values(
                          transactionsChartLabels
                        )[index];
                        return (
                          <Col xs={12}>
                            <div className="spaced-values">
                              <strong className="">
                                {typeof dataLabel === "object"
                                  ? dataLabel.join(" ")
                                  : dataLabel}
                              </strong>
                              <div>{(+val).toLocaleString()}</div>
                            </div>
                          </Col>
                        );
                      }
                    )}
                  </Row>
                </Col>
                <Col md={6} xs={12}>
                  <BarChart
                    dataset={createDataset(transactionsChartLabels)}
                    labels={Object.values(transactionsChartLabels)}
                  />
                </Col>
              </Row>
            </CardBody>
          </CardHeader>
        </Card>
        <Card className="card-chart">
          <CardHeader>
            <CardTitle tag="h2">
              {" "}
              <strong> Amount of Lisk sent/received</strong>
            </CardTitle>
            <CardBody className="">
              <Row>
                <Col md={6} xs={12} className="pt-4">
                  <Row className="h-100 sent-received-data">
                    <Col xs={12}>
                      <div className="spaced-values">
                        <strong>All</strong>
                        <div>
                          {(+beddowsToDecimal(
                            +data?.amounttransferredall || 0
                          ).toFixed(0)).toLocaleString()}
                        </div>
                      </div>
                    </Col>
                    {createDataset(sentReceivedChartLabels).map(
                      (val, index) => {
                        return (
                          <Col xs={12}>
                            <div className="spaced-values">
                              <strong className="">
                                {Object.values(sentReceivedChartLabels)[index]}
                              </strong>
                              <div>
                                {" "}
                                {(+beddowsToDecimal(+val || 0).toFixed(
                                  0
                                )).toLocaleString()}
                              </div>
                            </div>
                          </Col>
                        );
                      }
                    )}
                  </Row>
                </Col>
                <Col md={6} xs={12}>
                  <BarChart
                    dataset={createDataset(sentReceivedChartLabels).map(
                      (val) => {
                        return +beddowsToDecimal(val).toFixed(0);
                      }
                    )}
                    labels={Object.values(sentReceivedChartLabels)}
                    height={100}
                  />
                </Col>
              </Row>
            </CardBody>
          </CardHeader>
        </Card>
        <Row>
          <Col xs={12} md={6}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h2">
                  {" "}
                  <strong> Active/Inactive Wallets</strong>
                </CardTitle>
                <CardBody className="">
                  <Row>
                    {createDataset(activeInactiveChartLabels).map(
                      (val, index) => {
                        return (
                          <Col xs={12}>
                            <div className="spaced-values">
                              <strong className="">
                                {
                                  Object.values(activeInactiveChartLabels)[
                                    index
                                  ]
                                }
                              </strong>
                              <div> {(+val).toLocaleString()}</div>
                            </div>
                          </Col>
                        );
                      }
                    )}
                  </Row>
                  <PieChart
                    dataset={createDataset(activeInactiveChartLabels)}
                    labels={Object.values(activeInactiveChartLabels)}
                  />
                </CardBody>
              </CardHeader>
            </Card>
          </Col>

          <Col xs={12} md={6}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h2">
                  {" "}
                  <strong> Forged & Fees</strong>
                </CardTitle>
                <CardBody className="">
                  <Row>
                    {createDataset(feesChartLabels).map((val, index) => {
                      return (
                        <Col xs={12}>
                          <div className="spaced-values">
                            <strong className="">
                              {Object.values(feesChartLabels)[index]}
                            </strong>
                            <div>
                              {" "}
                              {(+beddowsToDecimal(+val || 0).toFixed(
                                0
                              )).toLocaleString()}
                            </div>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </CardBody>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }, [data, queryData, dropdown, dropdownOptions]);
};

export default ChainAnalysis;
