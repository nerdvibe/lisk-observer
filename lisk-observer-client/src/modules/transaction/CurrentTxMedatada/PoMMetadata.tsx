import React from "react";
import { Col, Row, Card } from "reactstrap";
import { Link } from "react-router-dom";
import { TransactionWithBlock } from "../../../generated/graphql";

interface Props {
  tx: TransactionWithBlock;
}

export const PoMMetadata: React.FC<Props> = ({ tx }) => {
  return (
    <Col md={12}>
      <Row>
        <Col md={4}>
          <h3 className="m-0">PoM report details</h3>
        </Col>
      </Row>
      <Row>
        {tx.pomData ? (
          <Col md={{ size: 6 }}>
            <div className={"alert alert-dark"}>
              <Col md={12}>
                <Row>
                  <Col md={5}>PoMed Delegate:</Col>
                  <Col>
                    <strong>
                      <Link to={`/account/${tx.pomData.address}`}>
                        {tx.pomData.username}
                      </Link>
                    </strong>
                  </Col>
                </Row>
              </Col>
            </div>
          </Col>
        ) : (
          ""
        )}
        <Col md={12} className={"text-center"}>
          {tx.data ? (
            <Card>
              <pre className="json-output">{tx.data}</pre>
            </Card>
          ) : (
            "No metadata included in this transaction"
          )}
        </Col>
      </Row>
    </Col>
  );
};
