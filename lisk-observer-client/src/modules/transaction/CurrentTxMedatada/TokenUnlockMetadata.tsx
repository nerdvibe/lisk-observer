import React from "react";
import { Col, Row } from "reactstrap";
import { TransactionWithBlock } from "../../../generated/graphql";
import { Link } from "react-router-dom";
import { beddowsToDecimal } from "../../utils/lisk/utils/lisk/beddowsToDecimal";

interface Props {
  tx: TransactionWithBlock;
}

export const TokenUnlockMetadata: React.FC<Props> = ({ tx }) => {
  return (
    <Col md={12}>
      <Row>
        <Col md={4}>
          <h3 className="m-0">Token Unlock details</h3>
        </Col>
      </Row>
      <Row>
        {tx.tokenUnlock?.map((unlock) => {
          return (
            <Col md={{ size: 6 }}>
              <div className={"alert alert-dark"}>
                <Col md={12}>
                  <Row>
                    <Col md={5}>Unvoted Delegate:</Col>
                    <Col>
                      <strong>
                        <Link to={`/account/${unlock!.delegateAddress}`}>
                          {unlock!.username || unlock!.delegateAddress}
                        </Link>
                      </strong>
                    </Col>
                  </Row>
                </Col>
                <Col md={12}>
                  <Row>
                    <Col md={5}>Amount unvote:</Col>
                    <Col>
                      <strong>
                        {+beddowsToDecimal(unlock!.amount!).toLocaleString()} Ⱡ
                      </strong>
                    </Col>
                  </Row>
                </Col>
                <Col md={12}>
                  <Row>
                    <Col md={5}>Unvoted at height:</Col>
                    <Col>
                      <strong>{unlock!.unvoteHeight}</strong>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={5}>Unvoted ont:</Col>
                    <Col>
                      <strong>{unlock!.unvoteHeight}</strong>
                    </Col>
                  </Row>
                </Col>
              </div>
            </Col>
          );
        })}
      </Row>
    </Col>
  );
};
