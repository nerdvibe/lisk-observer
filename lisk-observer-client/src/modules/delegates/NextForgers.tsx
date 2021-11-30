import { Alert, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import React from "react";

interface Delegate {
  username: string;
  address: string;
}

interface Props {
  delegates: Delegate[];
}

export const NextForgers: React.FC<Props> = ({ delegates }) => {
  const nextDelegates = delegates.slice(1, 15).map((delegate, index) => {
    return (
      <span className="important-value">
        <Link to={`/account/${delegate.address}`}>{delegate.username}</Link>
        {index !== 13 ? (
          <span className={"next-forger-divider"}>{"   |   "}</span>
        ) : (
          ""
        )}
      </span>
    );
  });

  return delegates.length > 0 ? (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Next delegates:</CardTitle>
      </CardHeader>
      <CardBody>
        <Alert className="alert-with-icon next-delegates-bg">
          <span className="app-icons icon-paper" data-notify="icon" />
          <span data-notify="message">
            <strong>Current:</strong>{" "}
            <Link to={`/account/${delegates[0].address}`}>
              {delegates[0].username}
            </Link>{" "}
            <br />
            <br />
            <strong>Next:</strong> {nextDelegates}
          </span>
        </Alert>
      </CardBody>
    </Card>
  ) : (
    <></>
  );
};
