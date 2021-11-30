import React from "react";
import { Badge, Card, CardBody, CardText, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { AvatarSize, DelegateLogo } from "../../../../utils/logos/DelegateLogo";
import { beddowsToDecimal } from "../../../../utils/lisk/utils/lisk/beddowsToDecimal";
import ReactTooltip from "react-tooltip";
import {
  calculateTargetDate,
  OFFSET_KIND,
} from "../../../../utils/lisk/blockOffsets/calculateDate";
import { useBlockHeightQuery } from "../../../../../generated/graphql";

export interface Unlocking {
  delegateAddress: string;
  amount: string;
  delegateUsername?: string;
  unvoteHeight: number;
}
interface Props {
  unlocks?: Unlocking[] | undefined;
  address: string;
  setAddressContextReact: (address: string) => void;
}

export const UnlockingElement: React.FC<Props> = ({
  unlocks = [],
  address,
  setAddressContextReact,
}) => {
  const { data: blockData } = useBlockHeightQuery({
    fetchPolicy: "cache-only",
  });

  const height = blockData?.lastBlock?.height;
  if (!height) {
    return <h2>"Component not available"</h2>;
  }
  return (
    <Card className="card-user">
      <CardBody className="no-min-height">
        <CardText />
        <div className="author">
          <h5 className="title">
            {unlocks.length
              ? `This Account has ${unlocks.length} balance unlocks scheduled:`
              : "This account has no balance unlock scheduled."}
          </h5>
        </div>
        <div className="card-description">
          <Row>
            <Col md={12}>
              {unlocks.map((v) => {
                const kind =
                  v.delegateAddress === address
                    ? OFFSET_KIND.SELF_VOTE
                    : OFFSET_KIND.UNVOTE;
                const targetDate = calculateTargetDate(
                  v.unvoteHeight,
                  height,
                  kind
                );
                return (
                  <Row>
                    <Col md={12}>
                      <Badge className={"badge-dark unlocking-element"}>
                        <Link to={`/${v.delegateAddress}`}>
                          <DelegateLogo
                            delegateName={v.delegateUsername!}
                            address={v.delegateAddress!}
                            generateRandom={true}
                            className="mr-2"
                            size={AvatarSize.SMALL}
                          />
                        </Link>
                        <h4 className="m-0 inline-element">
                          <Link
                            to={`/account/${v.delegateAddress}`}
                            onClick={() =>
                              setAddressContextReact(v.delegateAddress!)
                            }
                          >
                            {v.delegateUsername! || v.delegateAddress}
                          </Link>{" "}
                          ({beddowsToDecimal(v.amount || 0, 2).toLocaleString()}{" "}
                          Ⱡ) - unlocking on {targetDate.targetDateFormat}
                        </h4>
                      </Badge>
                    </Col>
                  </Row>
                );
              })}
            </Col>
          </Row>
        </div>
      </CardBody>
      <ReactTooltip />
    </Card>
  );
};
