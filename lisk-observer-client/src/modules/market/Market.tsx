import "./style.css";
import React from "react";
import MarketCard from "./MarketCard";
import { useScrollToTop } from "../utils/hooks";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { useMarketsQuery } from "../../generated/graphql";
import { IsErrorOrLoading } from "../utils/IsErrorOrLoading";

const Market = () => {
  useScrollToTop();

  const { data, error, loading } = useMarketsQuery();

  if (loading || error) {
    return (
      <div className="content">
        <IsErrorOrLoading error={!!error} title={"Markets"} />;
      </div>
    );
  }

  return (
    <div className="content">
      <div className="react-notification-alert-container"></div>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Markets</CardTitle>
            </CardHeader>
            <CardBody className="market-cards-body">
              <div className="market-cards-container">
                {data!.marketData!.map((market: any) => {
                  const { image, exchangeName, markets } = market;
                  return (
                    <MarketCard
                      image={image}
                      name={exchangeName}
                      pairs={markets}
                    />
                  );
                })}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Market;
