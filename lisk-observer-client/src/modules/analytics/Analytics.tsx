import React from "react";
import { Col, Row } from "reactstrap";
import { StatsCard } from "./StatsCard";
import PriceCard from "./PriceCard";
import TransactionsCard from "./TransactionsCard";
import { StatElement, useGetAnalyticsQuery } from "../../generated/graphql";
import { beddowsToDecimal } from "../utils/lisk/utils/lisk/beddowsToDecimal";
import TransactionsVolumeCard from "./TransactionsVolumeCard";
import TXKindsCard from "./TXKindsCard";
import { useScrollToTop } from "../utils/hooks";

export const Analytics = React.memo(
  () => {
    const { data, loading } = useGetAnalyticsQuery();
    useScrollToTop();
    return !loading ? (
      <div className="content">
        <div className="react-notification-alert-container"></div>
        <h1>Analytics</h1>
        <PriceCard />
        <Row>
          <Col xs={12} md={12} xl={4}>
            <StatsCard
              title={"Total staked"}
              value={`${(+beddowsToDecimal(
                data?.stats?.staked || 0
              )).toLocaleString()} LSK`}
              icon={"flag"}
            />
          </Col>
          <Col xs={12} md={12} xl={4}>
            <StatsCard
              title={"Total supply"}
              value={`${(+(data?.stats?.supply || 0)).toLocaleString()} LSK`}
              icon={"coins"}
            />{" "}
          </Col>
          <Col xs={12} md={12} xl={4}>
            <StatsCard
              title={"Blocks"}
              value={(data?.stats?.blocks || 0).toLocaleString()}
              icon={"cubes"}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12} xl={4}>
            <TransactionsCard
              stats={{
                transactions_history: {
                  month: [
                    ...(data?.stats?.lastMonth?.historicalTXs || []),
                  ] as StatElement[],
                  year: [
                    ...(data?.stats?.lastYear?.historicalTXs || []),
                  ] as StatElement[],
                },
              }}
            />
          </Col>
          <Col xs={12} md={12} xl={4}>
            <TransactionsVolumeCard
              stats={{
                transactions_history: {
                  latestValue: data?.stats?.lastDay?.totalVolume || 0,
                  month: [
                    ...(data?.stats?.lastMonth?.historicalTXs || []),
                  ] as StatElement[],
                  year: [
                    ...(data?.stats?.lastYear?.historicalTXs || []),
                  ] as StatElement[],
                  lastMonth: data?.stats?.lastMonth?.totalVolume || 0,
                  lastYear: data?.stats?.lastYear?.totalVolume || 0,
                },
              }}
            />
          </Col>
          <Col xs={12} md={12} xl={4}>
            <StatsCard
              title={"Total transactions"}
              value={(data?.stats?.totalTransactions || 0).toLocaleString()}
              icon={"percentage"}
              subItem={
                <>
                  <p>{data?.stats?.totalTransactions30} in Lisk 3.0+</p>
                </>
              }
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12} xl={4}>
            <TXKindsCard
              label={"Transfers"}
              stats={{
                latestValue: data?.stats?.lastDay?.txKinds?.transfers || 0,
                month: data?.stats?.lastMonth?.txKinds?.transfers || 0,
                year: data?.stats?.lastYear?.txKinds?.transfers || 0,
              }}
              icon={"exchange-alt"}
            />
          </Col>
          <Col xs={12} md={12} xl={4}>
            <TXKindsCard
              label={"Votes"}
              stats={{
                latestValue: data?.stats?.lastDay?.txKinds?.votes || 0,
                month: data?.stats?.lastMonth?.txKinds?.votes || 0,
                year: data?.stats?.lastYear?.txKinds?.votes || 0,
              }}
              icon={"vote-yea"}
            />
          </Col>
          <Col xs={12} md={12} xl={4}>
            <TXKindsCard
              label={"PoMs"}
              stats={{
                latestValue: data?.stats?.lastDay?.txKinds?.poms || 0,
                month: data?.stats?.lastMonth?.txKinds?.poms || 0,
                year: data?.stats?.lastYear?.txKinds?.poms || 0,
              }}
              icon={"gavel"}
            />
          </Col>
        </Row>
      </div>
    ) : (
      <></>
    );
  },
  () => true
);
