import React from "react";
import { Badge, Card, CardBody, CardText, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { SentVotes, ReceivedVotes } from "../../../generated/graphql";
import { beddowsToDecimal } from "../../utils/lisk/utils/lisk/beddowsToDecimal";
import { AvatarSize, DelegateLogo } from "../../utils/logos/DelegateLogo";
import { truncateMidString } from "../../utils/strings/strings";

export enum VOTE_KIND {
  SENT = "SENT",
  RECEIVED = "RECEIVED",
}

interface Props {
  votes: SentVotes[] | ReceivedVotes[];
  setAddressContextReact: (address: string) => void;
  kind: VOTE_KIND;
}

export const AccountVotes: React.FC<Props> = ({
  votes,
  setAddressContextReact,
  kind,
}) => {
  const hasVoteMessage =
    kind === VOTE_KIND.SENT
      ? `This Account is voting for ${votes.length} delegate${
          votes.length === 1 ? "" : "s"
        }:`
      : `This Account has received ${votes.length} vote${
          votes.length === 1 ? "" : "s"
        }:`;
  const noVoteMessage =
    kind === VOTE_KIND.SENT
      ? `This Account is not voting`
      : `This Account hasn't received votes`;

  return (
    <Card className="card-user">
      <CardBody className="no-min-height">
        <CardText />
        <div className="author">
          <h5 className="title">
            {votes.length ? hasVoteMessage : noVoteMessage}
          </h5>
        </div>
        <div className="card-description">
          <Row>
            <Col md={12}>
              {(votes as any).map((v: any) => {
                return (
                  <Row>
                    <Col md={12}>
                      <Badge className={"badge-dark px-4 py-3 m-1 br-15"}>
                        <Link to={`/${v.delegateAddress || v.sender}`}>
                          <DelegateLogo
                            delegateName={
                              v.delegateUsername! || v.senderUsername
                            }
                            address={v.delegateAddress! || v.sender}
                            generateRandom={true}
                            className="mr-2"
                            size={AvatarSize.SMALL}
                          />
                        </Link>
                        <h4 className="m-0 inline-element vote-badge-text">
                          <Link
                            to={`/account/${v.delegateAddress || v.sender}`}
                            onClick={() =>
                              setAddressContextReact(
                                v.delegateAddress! || v.sender
                              )
                            }
                          >
                            {v.delegateUsername! ||
                              v.senderUsername ||
                              truncateMidString(v.sender, 10)}
                          </Link>{" "}
                          ({beddowsToDecimal(v.amount || 0, 2).toLocaleString()}{" "}
                          Ⱡ)
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
    </Card>
  );
};
