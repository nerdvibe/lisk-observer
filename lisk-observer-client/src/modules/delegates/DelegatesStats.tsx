import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import React from "react";

interface Props {
  totalDelegates: number;
  greenDelegates: number;
}

export const DelegateStats: React.FC<Props> = ({
  totalDelegates,
  greenDelegates,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Consensus stats:</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col>
            <span data-notify="message">
              <span
                className="app-icons icon-paper left-icon"
                data-notify="icon"
              />{" "}
              <span className="inline-element">
                <strong className="important-value-label">Blocktime:</strong>
                <div className="left20">
                  <p>~ 10 seconds</p>
                </div>
              </span>
            </span>
          </Col>
          <Col>
            <span data-notify="message">
              <span
                className="app-icons icon-check-2 left-icon"
                data-notify="icon"
              />{" "}
              <span className="inline-element">
                <strong className="important-value-label">
                  Active delegates:
                </strong>
                <div className="left20">
                  <p>{greenDelegates}/103</p>
                </div>
              </span>
            </span>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <span
              className="app-icons icon-time-alarm left-icon"
              data-notify="icon"
            />{" "}
            <span className="inline-element">
              <strong className="important-value-label">
                Standby delegates:
              </strong>{" "}
              <div className="left20">
                <p>{totalDelegates - 103}</p>
              </div>
            </span>
            <br />
          </Col>
          <Col>
            <span data-notify="message">
              <span
                className="app-icons icon-link-72 left-icon"
                data-notify="icon"
              />{" "}
              <span className="inline-element">
                <strong className="important-value-label">
                  Total delegates:
                </strong>{" "}
                <div className="left20">
                  <p>{totalDelegates}</p>
                </div>
              </span>
            </span>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};
