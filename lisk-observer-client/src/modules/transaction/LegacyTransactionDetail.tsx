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
import { RealRecipient } from "./RealRecipient";
import { TxIconLegacy } from "./TxIconLegacy";
import { TXMetadataLegacy } from "./LegacyTxMetadata/TxMetaDataLegacy";
import { fromLiskEpoch } from "../utils/lisk/utils/lisk/time";
import { Copy } from "../../UI/copy/Copy";

interface Props {
  txQuery?: any;
  blockQuery?: any;
}

export const LegacyTransactionDetails: React.FC<Props> = ({
  txQuery: tx,
  blockQuery,
}) => {
  return (
    <div className="content">
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Transaction detail:</CardTitle>
        </CardHeader>
        <CardBody className="white-text">
          <Row>
            <Col md={2} className={"text-center"}>
              {TxIconLegacy(tx)}
            </Col>
            <Col md={10}>
              <Row>
                <Col md={3}>ID:</Col>
                <Col md={3}>
                  <strong>
                    {tx.id}
                    {tx.id && <Copy text={tx.id} />}
                  </strong>
                </Col>
              </Row>
              <Row>
                <Col md={3}>Sender:</Col>
                <Col md={3}>
                  <strong>
                    <Link to={`/account/${tx.senderId}`}>
                      {(tx.sender && tx.sender.username) ||
                        (tx.sender_tag && tx.sender_tag.tag) ||
                        tx.senderId}
                      {tx.senderId && <Copy text={tx.senderId} />}
                    </Link>
                  </strong>
                </Col>
                <Col md={3}>Recipient:</Col>
                <Col md={3}>
                  {RealRecipient(tx)}
                  {tx.recipientId && <Copy text={tx.recipientId} />}
                </Col>
              </Row>
              <Row>
                <Col md={3}>Fee:</Col>
                <Col md={3}>
                  <strong>
                    {+beddowsToDecimal(+tx.fee).toLocaleString()} Ⱡ
                  </strong>
                </Col>
                <Col md={3}>Amount:</Col>
                <Col md={3}>
                  <Badge className={"badge-dark fs-medium"}>
                    {+beddowsToDecimal(tx.amount).toLocaleString()} Ⱡ
                  </Badge>
                </Col>
              </Row>
              <Row>
                <Col md={3}>TX timestamp:</Col>
                <Col md={3}>
                  <strong>
                    {moment(fromLiskEpoch(+tx.timestamp)).format(
                      "D/MM/YYYY - HH:mm:ss"
                    )}
                  </strong>
                </Col>
                <Col md={3}>Block timestamp:</Col>
                <Col md={3}>
                  <strong>
                    {" "}
                    {moment(fromLiskEpoch(blockQuery.timestamp)).format(
                      "D/MM/YYYY - HH:mm:ss"
                    )}
                  </strong>
                </Col>
              </Row>
              <Row>
                <TXMetadataLegacy tx={tx} />
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
                  <strong>{tx.blockId}</strong>
                </Col>
                <Col md={3}>Height:</Col>
                <Col md={3}>
                  <strong>{blockQuery.height}</strong>
                </Col>
              </Row>
              <Row>
                <Col md={3}>Timestamp:</Col>
                <Col md={3}>
                  <strong>
                    {moment(fromLiskEpoch(+blockQuery.timestamp)).format(
                      "D/MM/YYYY - HH:mm:ss"
                    )}
                  </strong>
                </Col>
                <Col md={3}>Validated by:</Col>
                <Col md={3}>
                  {blockQuery.generatorPublicKey ? (
                    <Link to={`/account/${blockQuery.generatorPublicKey}`}>
                      {blockQuery.username || blockQuery.generatorPublicKey}
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
