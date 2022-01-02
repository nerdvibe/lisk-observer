import React from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { IsErrorOrLoading } from "../utils/IsErrorOrLoading";
import { AvatarSize, DelegateLogo } from "../utils/logos/DelegateLogo";
import { Link } from "react-router-dom";
import moment from "moment";
import { beddowsToDecimal } from "../utils/lisk/utils/lisk/beddowsToDecimal";
import { useVotesQuery } from "../../generated/graphql";
import "./style.css";
import { useScrollToTop } from "../utils/hooks";

export const LastVotes: React.FC = () => {
  useScrollToTop();
  const { data: lastVotesData, error: lastVotesError } = useVotesQuery({
    variables: {
      page: 1,
    },
  });

  if (lastVotesError || !lastVotesData) {
    return (
      <div className="content">
        <IsErrorOrLoading error={!!lastVotesError} title={"Votes"} />
      </div>
    );
  }

  return (
    <div className="content">
      <div className="react-notification-alert-container"></div>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">
                Last votes:
                <p className="category text-transform-none">
                  Do you prefer to see the votes as a table? Go on the
                  transactions table and filter by transaction type
                </p>
              </CardTitle>
            </CardHeader>
            <CardBody className="votes-card">
              {lastVotesData!.votes?.data?.map((vote, i) => {
                return (
                  <div
                    className={`vote-card w-100 ${
                      +vote!.amount > 0 ? "vote" : "unvote"
                    }`}
                  >
                    <div
                      className={`vote_status ${
                        +vote!.amount > 0 ? "positive_vote" : "negative_vote"
                      }`}
                    />
                    <div className="inline-element w-85">
                      <DelegateLogo
                        delegateName={
                          vote?.senderUsername || vote?.sentAddress || ""
                        }
                        address={vote?.sentAddress}
                        generateRandom={true}
                        className="vote-icon mr-2"
                        size={AvatarSize.SMALL}
                      />
                      <div className="inline-element vote-sender-name">
                        <h6 className="vote-label">Sender</h6>
                        <Link to={`account/${vote?.sentAddress}`}>
                          {vote?.senderUsername || vote?.sentAddress}
                        </Link>{" "}
                      </div>{" "}
                      <div className="vote-text">
                        <span className="hide-small-screen">→</span>{" "}
                        {+vote!.amount > 0 ? "Voted" : "Unvoted"}{" "}
                        <span className="hide-small-screen">→</span>
                      </div>
                      <div className="inline-element vote-recipient-name">
                        <DelegateLogo
                          delegateName={
                            vote?.recipientUsername ||
                            vote?.receivedAddress ||
                            ""
                          }
                          address={vote?.receivedAddress}
                          generateRandom={true}
                          className="vote-icon mr-2"
                          size={AvatarSize.SMALL}
                        />
                        <div className="inline-element">
                          <h6 className="vote-label">Recipient</h6>
                          <Link to={`account/${vote?.receivedAddress}`}>
                            {vote?.recipientUsername || vote?.receivedAddress}
                          </Link>{" "}
                        </div>{" "}
                      </div>
                    </div>
                    <div className="vote-amount">
                      {beddowsToDecimal(+vote!.amount, 2).toLocaleString()} Ⱡ{" "}
                    </div>
                    <br />
                    <div className="vote-time">
                      <Link to={`transaction/${vote!.id}`}>
                        {moment(+vote!.timestamp * 1000).fromNow()}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
