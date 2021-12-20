import React from "react";
import { Badge, Button, Card, CardBody, CardText, Col, Row } from "reactstrap";
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
  account: string;
}

export const AccountVotes: React.FC<Props> = ({
  votes,
  setAddressContextReact,
  kind,
  account,
}) => {
  const votesList = [...votes].filter(
    (vote: SentVotes | ReceivedVotes) => vote?.amount && +vote.amount > 0
  );
  const hasVoteMessage =
    kind === VOTE_KIND.SENT
      ? `This Account is voting for ${votesList.length} delegate${
          votesList.length === 1 ? "" : "s"
        }:`
      : `This Account has received ${votesList.length} vote${
          votesList.length === 1 ? "" : "s"
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
            {votesList.length ? hasVoteMessage : noVoteMessage}
          </h5>
        </div>
        <div className="card-description">
          <Row>
            {(votesList as any).slice(0, 10).map((v: any) => {
              return (
                <Col md={12}>
                  <Badge className={"badge-dark px-4 py-3 m-1 br-15"}>
                    <Link to={`/${v.delegateAddress || v.sender}`}>
                      <DelegateLogo
                        delegateName={v.delegateUsername! || v.senderUsername}
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
                          setAddressContextReact(v.delegateAddress! || v.sender)
                        }
                      >
                        {v.delegateUsername! ||
                          v.senderUsername ||
                          truncateMidString(v.sender, 10)}
                      </Link>{" "}
                      ({(+beddowsToDecimal(v.amount || 0, 2)).toLocaleString()}{" "}
                      Ⱡ)
                    </h4>
                  </Badge>
                </Col>
              );
            })}
            {votesList.length > 10 && (
              <Col xs={12}>
                <Link
                  to={`/account/${account}?tab=details&section=${
                    kind === VOTE_KIND.SENT ? "sent" : "received"
                  }`}
                >
                  <Button className="btn-round w-100">Show all</Button>
                </Link>
              </Col>
            )}
          </Row>
        </div>
      </CardBody>
    </Card>
  );
};
