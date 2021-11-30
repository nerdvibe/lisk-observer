import React, { useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardText,
  Col,
  Row,
} from "reactstrap";
import { DelegateLogo } from "../../../utils/logos/DelegateLogo";
import { beddowsToDecimal } from "../../../utils/lisk/utils/lisk/beddowsToDecimal";
import { truncateMidString } from "../../../utils/strings/strings";
import ReactTooltip from "react-tooltip";
import QRCode from "react-qr-code";
import { Copy } from "../../../../UI/copy/Copy";

interface Props {
  address: string;
  balance: string;
  username: string;
  publicKey: string;
}

export const LegacyAccountDetails: React.FC<Props> = ({
  address,
  balance,
  username,
  publicKey,
}) => {
  const [QRCodeActive, setQRCodeActivet] = useState(false);

  const toggleQR = () => setQRCodeActivet(!QRCodeActive);

  return (
    <Card className="card-user">
      <CardBody>
        <CardText />
        <div className="author">
          <div className="block block-one" />
          <div className="block block-two" />
          <div className="block block-three" />
          <div className="block block-four" />
          <DelegateLogo
            delegateName={username}
            address={address}
            generateRandom={true}
          />
          <h5 className="title">
            {username || address} {!username && <Copy text={address} />}
          </h5>
          <h5 className="title">
            {username ? address : ""} {username && <Copy text={address} />}
          </h5>
          <p className="description">
            {username ? "Delegate account" : "Normal account"}
          </p>
        </div>
        <div className="card-description">
          <Row>
            <Col md={6}>
              <strong>Balance:</strong>
            </Col>
            <Col md={6}>
              <Badge className={"badge-dark fs-medium"}>
                {beddowsToDecimal(+balance, 2).toLocaleString()} Ⱡ
              </Badge>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <strong>Public Key:</strong>
            </Col>
            <Col md={6} data-tip={publicKey}>
              {publicKey ? (
                <span>
                  {truncateMidString(publicKey, 10)} <Copy text={publicKey} />
                </span>
              ) : (
                "Not initialized"
              )}
            </Col>
          </Row>
        </div>
      </CardBody>
      <CardFooter>
        <div className="button-container">
          <a
            className="btn btn-round"
            href={`lisk://wallet?recipient=${address}`}
          >
            Send
          </a>
          {username ? (
            <a
              className="btn btn-round"
              href={`lisk://delegates/vote/?votes=${username}`}
            >
              Vote
            </a>
          ) : null}
          <Button className="btn-round" onClick={toggleQR}>
            QR
          </Button>
        </div>
        <div className={`text-center QRcode ${QRCodeActive ? "is-show" : ""}`}>
          <QRCode value={address} />
        </div>
      </CardFooter>
      <ReactTooltip />
    </Card>
  );
};
