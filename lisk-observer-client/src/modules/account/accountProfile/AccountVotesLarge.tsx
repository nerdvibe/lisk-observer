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
  title: string;
}

export const AccountVotesLarge: React.FC<Props> = ({
  votes,
  setAddressContextReact,
  kind,
  title,
}) => {
  const votesWithAmounts = (votes as SentVotes[]).filter(
    (vote: SentVotes | ReceivedVotes) => +vote.amount! > 0
  );
  const hasVoteMessage =
    kind === VOTE_KIND.SENT
      ? `This Account is voting for ${votesWithAmounts.length} delegate${
          votesWithAmounts.length === 1 ? "" : "s"
        }:`
      : `This Account has received ${votesWithAmounts.length} vote${
          votesWithAmounts.length === 1 ? "" : "s"
        }:`;
  const noVoteMessage =
    kind === VOTE_KIND.SENT
      ? `This Account is not voting`
      : `This Account hasn't received votes`;

  return (
    <Card className="card-user">
      <CardBody className="no-min-height">
        <CardText />
        <h4>{title}</h4>
        <h5 className="title align-left">
          {votesWithAmounts.length ? hasVoteMessage : noVoteMessage}
        </h5>
        <div className="card-description">
          <Row>
            <Col md={12}>
              {(votesWithAmounts as any).map((v: any) => {
                return (
                  <>
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
                  </>
                );
              })}
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>
  );
};
