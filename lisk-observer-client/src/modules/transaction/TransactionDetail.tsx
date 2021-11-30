import React from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import { beddowsToDecimal } from "../utils/lisk/utils/lisk/beddowsToDecimal";
import moment from "moment";
import { Link } from "react-router-dom";
import { TxIcon } from "./TxIcon";
import { TXMetadata } from "./CurrentTxMedatada/TxMetaData";
import { TransactionWithBlock } from "../../generated/graphql";
import { Copy } from "../../UI/copy/Copy";
import { RealRecipient } from "./RealRecipient";
import "./style.css";

interface Props {
  txQuery?: any;
  confirmations: number;
}

export const TransactionDetail: React.FC<Props> = ({
  txQuery,
  confirmations,
}) => {
  if (!txQuery || !txQuery.transaction) {
    return <></>;
  }
  const tx = txQuery.transaction;
  return (
    <div className="content">
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Transaction detail:</CardTitle>
        </CardHeader>
        <CardBody className="white-text">
          <Row>
            <Col md={2} className={"text-center"}>
              <TxIcon
                type={tx.moduleAssetId}
                confirmations={confirmations}
                blockIsFinal={tx.isFinalized}
              />
            </Col>
            <Col md={10}>
              <Row>
                <Col md={3}>ID:</Col>
                <Col md={3}>
                  <strong>{tx.id}</strong> <Copy text={tx.id} />
                </Col>
                <Col md={3}>Amount:</Col>
                <Col md={3}>
                  <Badge className={"badge-dark fs-medium"}>
                    {
                      +beddowsToDecimal(
                        !!tx.amount ? tx.amount : 0
                      ).toLocaleString()
                    }{" "}
                    Ⱡ
                  </Badge>
                </Col>
              </Row>
              <Row>
                <Col md={3}>Sender:</Col>
                <Col md={3}>
                  <strong>
                    <Link to={`/account/${tx.senderId}`}>
                      {tx.senderUsername || tx.senderId}
                    </Link>{" "}
                    {tx.senderId && <Copy text={tx.senderId} />}
                  </strong>
                </Col>
                <Col md={3}>Recipient:</Col>
                <Col md={3}>
                  {RealRecipient(tx)}{" "}
                  {tx.moduleAssetId === "2:0" && (
                    <Copy text={tx.recipientId || ""} />
                  )}
                </Col>
              </Row>
              <Row>
                <Col md={3}>Fee:</Col>
                <Col md={3}>
                  <strong>
                    {tx.fee &&
                      +beddowsToDecimal(
                        !!tx.fee ? tx.fee : 0
                      ).toLocaleString()}{" "}
                    Ⱡ
                  </strong>
                </Col>
                <Col md={3}>Confirmations:</Col>
                <Col md={3}>
                  <strong>{confirmations} confirmations</strong>
                </Col>
              </Row>
              <Row>
                <Col md={3}>TX timestamp:</Col>
                <Col md={3}>
                  <strong>
                    {moment(+tx.timestamp * 1000).format(
                      "dddd D/MM/YYYY - HH:mm:ss Z"
                    )}
                    {" - "}({moment(+tx.blockTimestamp * 1000).fromNow()})
                  </strong>
                </Col>
                <Col md={3}>Block timestamp:</Col>
                <Col md={3}>
                  <strong>
                    {" "}
                    {moment(+tx.blockTimestamp * 1000).format(
                      "dddd D/MM/YYYY - HH:mm:ss Z"
                    )}
                    {" - "}({moment(+tx.blockTimestamp * 1000).fromNow()})
                  </strong>
                </Col>
              </Row>
              <Row className="mt-4">
                <TXMetadata tx={tx as TransactionWithBlock} />
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">Present in this block</CardTitle>
        </CardHeader>
        <CardBody className="white-text">
          <Row>
            <Col md={2} className={"text-center"}>
              <i className="app-icons icon-app font-xxl" />
            </Col>
            <Col md={10}>
              <Row>
                <Col md={3}>ID:</Col>
                <Col md={3}>
                  <strong>
                    <Link to={`/block/${tx.blockId}`}>{tx.blockId}</Link>
                  </strong>{" "}
                  <Copy text={tx.blockId} />
                </Col>
                <Col md={3}>Height:</Col>
                <Col md={3}>
                  <strong>{tx.blockHeight}</strong>
                </Col>
              </Row>
              <Row>
                <Col md={3}>Timestamp:</Col>
                <Col md={3}>
                  <strong>
                    {moment(+tx.blockTimestamp * 1000 || 0).format(
                      "D/MM/YYYY - HH:mm:ss"
                    )}
                    {" - "}({moment(+tx.blockTimestamp * 1000).fromNow()})
                  </strong>
                </Col>
                <Col md={3}>Validated by:</Col>
                <Col md={3}>
                  {tx.blockUsername ? (
                    <Link to={`/account/${tx.blockAddress}`}>
                      {tx.blockUsername}
                    </Link>
                  ) : (
                    "unknown"
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};
