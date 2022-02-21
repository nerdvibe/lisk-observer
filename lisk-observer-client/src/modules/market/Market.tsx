import "./style.css";
import React from "react";
import MarketCard from "./MarketCard";
import MarketMock from "./MarketMock.json";
import { useScrollToTop } from "../utils/hooks";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";

const Market = () => {
  useScrollToTop();

  // if (loading || error) {
  //   return (
  //     <div className="content">
  //       <IsErrorOrLoading
  //         error={!!error || !!pricesError}
  //         title={"Markets"}
  //       />
  //       ;
  //     </div>
  //   );
  // }

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
                {MarketMock.map(({ img, name, link, pairs }) => (
                  <MarketCard img={img} name={name} link={link} pairs={pairs} />
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Market;
