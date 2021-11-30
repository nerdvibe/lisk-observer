import { Alert, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import React from "react";

interface Delegate {
  username: string;
}

interface Props {
  delegates: Delegate[];
}

export const NextForgers: React.FC<Props> = ({ delegates }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Next delegates:</CardTitle>
      </CardHeader>
      <CardBody>
        <Alert className="alert-with-icon" color="info">
          <span className="app-icons icon-paper" data-notify="icon" />
          <span data-notify="message">
            <strong>Current:</strong>{" "}
            <Link
              to={`/account/${delegates[0].username}`}
              className="next-delegate-name"
            >
              {delegates[0].username}
            </Link>{" "}
            <br />
            <strong>Next:</strong> {delegates[1].username}
            {" | "}
            {delegates[2].username}
            {" | "}
            {delegates[3].username}
            {" | "}
            {delegates[4].username}
            {" | "}
            {delegates[5].username}
            {" | "}
            {delegates[6].username}
            {" | "}
            {delegates[7].username}
            {" | "}
            {delegates[8].username}
            {" | "}
            {delegates[9].username}
            {" | "}
            {delegates[10].username}
            {" | "}
            {delegates[11].username}
            {" | "}
            {delegates[12].username}
            {" | "}
            {delegates[13].username}
            {" | "}
            {delegates[14].username}
            {" | "}
            {delegates[15].username}
          </span>
        </Alert>
      </CardBody>
    </Card>
  );
};
