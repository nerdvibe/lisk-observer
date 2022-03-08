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
import { MIN_SELF_VOTE_PERCENT } from "../../../utils/const";
import { SentVotes } from "../../../../generated/graphql";
import FavoriteButton from "../../../../UI/components/favoriteButton/FavoriteButton";

interface Props {
  address: string;
  balance: string;
  lockedBalance: string;
  username: string;
  publicKey: string;
  multisig: string;
  addressTag?: string;
  isLiskhq?: boolean;
  isExchange?: boolean;
  isScam?: boolean;
  votes: SentVotes[];
  totalVotesReceived: string;
}

export const CurrentAccountDetails: React.FC<Props> = ({
  address,
  addressTag,
  isLiskhq,
  isExchange,
  isScam,
  balance,
  lockedBalance,
  username,
  publicKey,
  multisig,
  votes,
  totalVotesReceived,
}) => {
  const [QRCodeActive, setQRCodeActivet] = useState(false);

  const toggleQR = () => setQRCodeActivet(!QRCodeActive);

  const selfVote = votes.reduce((acc, curr) => {
    if (curr.delegateAddress === address) {
      return +curr.amount! + acc;
    } else {
      return acc;
    }
  }, 0);

  const maxVotes = (selfVote / MIN_SELF_VOTE_PERCENT) * 100;
  const available = +maxVotes - +totalVotesReceived;
  const usedCapacity = ((available * 100) / maxVotes).toFixed(2);

  const balanceDetails = `
    Locked balance: ${(+beddowsToDecimal(
      +lockedBalance,
      2
    )).toLocaleString()} Ⱡ <br/>
    Total balance: ${(+beddowsToDecimal(
      +(balance || 0) + +(lockedBalance || 0),
      2
    )).toLocaleString()}
    Ⱡ
  `;

  return (
    <Card className="card-user">
      <CardBody>
        <CardText />
        <div className="fav-button">
          <FavoriteButton address={address} username={username} />
        </div>
        <div className="author">
          <div className="block block-one" />
          <div className="block block-two" />
          <div className="block block-three" />
          <div className="block block-four" />
          <DelegateLogo
            delegateName={username}
            className="avatar"
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
          <p className="description">
            <Badge
              className={
                isScam ? "badge-danger  fs-medium" : "badge-info  fs-medium"
              }
            >
              {addressTag}
            </Badge>
            {isLiskhq ? (
              <Badge className={"badge-info fs-medium"}>LiskHQ</Badge>
            ) : null}
            {isExchange ? (
              <Badge className={"badge-info fs-medium"}>Exchange</Badge>
            ) : null}
          </p>
        </div>
        <div className="card-description">
          <Row data-tip={balanceDetails}>
            <Col md={6}>
              <strong>Usable Balance:</strong>
            </Col>
            <Col md={6} className="align-right row-value white-text">
              <Badge className={"badge-dark  text-success fs-medium"}>
                {(+beddowsToDecimal(+balance, 2)).toLocaleString()} Ⱡ
              </Badge>
            </Col>
          </Row>
          <Row data-tip={publicKey}>
            <Col md={6}>
              <strong>Public Key:</strong>
            </Col>
            <Col md={6} className="align-right row-value white-text">
              {publicKey ? (
                <span>
                  {truncateMidString(publicKey, 10)} <Copy text={publicKey} />
                </span>
              ) : (
                "Not initialized"
              )}
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <strong>Multisig:</strong>
            </Col>
            <Col md={6} className="align-right row-value white-text">
              {+multisig > 0 ? `${multisig} keys` : "No"}
            </Col>
          </Row>
          {username ? (
            <>
              <Row>
                <Col md={6}>
                  <strong>Vote capacity avail:</strong>
                </Col>
                <Col md={6} className="align-right row-value white-text">
                  {isNaN(+usedCapacity) ? "0" : usedCapacity}%
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <strong>Vote capacity left:</strong>
                </Col>
                <Col md={6} className="align-right row-value white-text">
                  {
                    +beddowsToDecimal(
                      !!available ? available : 0
                    ).toLocaleString()
                  }{" "}
                  Ⱡ
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <strong>Self vote:</strong>
                </Col>
                <Col md={6} className="align-right row-value white-text">
                  {
                    +beddowsToDecimal(
                      !!selfVote ? selfVote : 0
                    ).toLocaleString()
                  }{" "}
                  Ⱡ
                </Col>
              </Row>
            </>
          ) : null}
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
      <ReactTooltip multiline={true} />
    </Card>
  );
};
