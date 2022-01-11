import React, { useMemo, useState } from "react";
import { Badge, Col, Row, Collapse } from "reactstrap";
import moment from "moment";
import { ReactComponent as TransactionIcon } from "./icons/transaction.svg";
import { ReactComponent as DelegateRegistrationIcon } from "./icons/delegateRegistration.svg";
import { ReactComponent as MultisigIcon } from "./icons/multisig.svg";
import { ReactComponent as VoteIcon } from "./icons/vote.svg";
import { ReactComponent as TokenUnlockIcon } from "./icons/tokenUnlock.svg";
import { ReactComponent as POMIcon } from "./icons/pom.svg";
import { ReactComponent as ClaimIcon } from "./icons/claim.svg";
import { ReactComponent as UnsupportedIcon } from "./icons/unsupported.svg";
import { Link } from "react-router-dom";
import { beddowsToDecimal } from "../../utils/lisk/utils/lisk/beddowsToDecimal";
import { truncateMidString } from "../../utils/strings/strings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sanitizeString } from "../../utils/strings/censor";
import { TX_TYPES } from "../../utils/const";
moment.relativeTimeThreshold("ss", 0);

interface Props {
  fade: boolean;
  index: number;
  key: number;
  id: string;
  sender: string;
  senderAddress: string;
  recipient: string;
  recipientAddress: string;
  transferData: string;
  amount: number;
  type: string;
  fee: number;
  confirmations: number;
  when: string;
}

export const TransactionElement: React.FC<Props> = ({
  fade,
  index,
  id,
  sender,
  amount,
  fee,
  senderAddress,
  recipient,
  recipientAddress,
  transferData,
  confirmations,
  type,
  when,
}) => {
  const shouldFade = index === 0 && fade;

  const iconType = () => {
    switch (type) {
      case TX_TYPES.TRANSACTION:
        return (
          <TransactionIcon
            fill={
              confirmations >= 30
                ? "green"
                : document.body.classList.contains("white-content")
                ? "black"
                : "white"
            }
            width={40}
            height={40}
            data-tip={`${confirmations} confirmations`}
          />
        );
      case TX_TYPES.MULTISIG_REG:
        return <MultisigIcon fill={"green"} width={40} height={40} />;
      case TX_TYPES.REGISTER_DELEGATE:
        return (
          <DelegateRegistrationIcon fill={"green"} width={40} height={40} />
        );
      case TX_TYPES.VOTE:
        return <VoteIcon fill={"green"} width={40} height={40} />;
      case TX_TYPES.TOKEN_UNLOCK:
        return <TokenUnlockIcon fill={"green"} width={40} height={40} />;
      case TX_TYPES.POM_REPORT:
        return <POMIcon fill={"green"} width={40} height={40} />;
      case TX_TYPES.LEGACY_ADDRESS_CLAIM:
        return <ClaimIcon fill={"green"} width={40} height={40} />;
      default:
        return <UnsupportedIcon fill={"green"} width={40} height={40} />;
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  let mobile = window.innerWidth <= 440 ? true : false;

  const toggle = () => setIsOpen(!isOpen);

  return useMemo(() => {
    return !mobile ? (
      <Row className={`last-ten-row ${shouldFade ? "fade-in" : ""}`}>
        <Col xs={1} sm={1} md={1}>
          <Row>
            <Col md={12} className="pl-0">
              {iconType()}
            </Col>
          </Row>
        </Col>
        <Col xs={3} sm={3} md={3}>
          <Row>
            <Col md={12}>
              <p>
                <Link to={`/transaction/${id}`}>
                  {truncateMidString(id, 10)}
                </Link>
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <p>{when}</p>
            </Col>
          </Row>
        </Col>
        <Col xs={5} sm={5} md={5}>
          <Row>
            <Col md={12}>
              from{" "}
              <Link to={`/account/${senderAddress}`}>
                {truncateMidString(sender)}
              </Link>
              {!!transferData ? (
                <FontAwesomeIcon
                  data-tip={sanitizeString(transferData)}
                  className="fa font-s ml-1"
                  icon={["fas", "comment"]}
                />
              ) : null}
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              {type === "2:0" ? (
                <>
                  to{" "}
                  <Link to={`/account/${recipientAddress}`}>
                    {truncateMidString(recipient)}
                  </Link>
                </>
              ) : (
                recipient
              )}
            </Col>
          </Row>
        </Col>
        <Col xs={3} sm={3} md={3} className={"text-right"}>
          <Row>
            <Col md={12}>
              <Badge className={"badge-dark font-m"}>
                {+beddowsToDecimal(!!amount ? amount : 0).toLocaleString()} Ⱡ
              </Badge>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              fee: {+beddowsToDecimal(!!fee ? fee : 0).toLocaleString()} Ⱡ
            </Col>
          </Row>
        </Col>
      </Row>
    ) : (
      <div>
        <Row
          className={`last-ten-row ${shouldFade ? "fade-in" : ""}`}
          onClick={toggle}
        >
          <Col xs={1} sm={1} md={1}>
            <Row>
              <Col md={12} className="pl-0">
                {iconType()}
              </Col>
            </Row>
          </Col>
          <Col xs={2} sm={1} md={1}></Col>
          <Col xs={8} sm={5} md={5}>
            <Row>
              <Col md={12}>
                from{" "}
                <Link to={`/account/${senderAddress}`}>
                  {truncateMidString(sender)}
                </Link>
                {!!transferData ? (
                  <FontAwesomeIcon
                    data-tip={transferData}
                    className="fa font-s ml-1"
                    icon={["fas", "comment"]}
                  />
                ) : null}
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {type === "2:0" ? (
                  <>
                    to{" "}
                    <Link to={`/account/${recipientAddress}`}>
                      {truncateMidString(recipient)}
                    </Link>
                  </>
                ) : (
                  recipient
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <Collapse isOpen={isOpen}>
          <Row>
            <Col xs={6} sm={3} md={3}>
              <Row>
                <Col md={12}>
                  <p>{truncateMidString(id, 10)}</p>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <p>{when}</p>
                </Col>
              </Row>
            </Col>
            <Col xs={5} sm={3} md={3} className={"text-right"}>
              <Row>
                <Col md={12}>
                  <Badge className={"badge-dark font-m"}>
                    {+beddowsToDecimal(!!amount ? amount : 0).toLocaleString()}{" "}
                    Ⱡ
                  </Badge>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  fee: {+beddowsToDecimal(!!fee ? fee : 0).toLocaleString()} Ⱡ
                </Col>
              </Row>
            </Col>
          </Row>
        </Collapse>
      </div>
    );
  }, [when]);
};
