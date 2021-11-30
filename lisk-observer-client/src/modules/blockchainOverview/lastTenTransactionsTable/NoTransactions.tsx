import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import React from "react";

export const NoData = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Last Transactions</CardTitle>
      </CardHeader>
      <CardBody>
        <Row className="last-ten-list-container">
          <Col md={12}>
            <Row className="last-ten-row">
              <Col md={12}>
                <Row>
                  <Col md={12} className="pl-0">
                    No transactions
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};
