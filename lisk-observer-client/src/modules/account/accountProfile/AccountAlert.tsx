import { Card, CardBody, Row, UncontrolledAlert } from "reactstrap";
import React from "react";

interface Props {
  msg: string;
}

export const AccountAlert: React.FC<Props> = ({ msg }) => {
  return (
    <Row>
      <Card>
        <CardBody>
          <UncontrolledAlert color="danger">
            <span>
              <b>Danger - </b>
              {msg}
            </span>
          </UncontrolledAlert>
        </CardBody>
      </Card>
    </Row>
  );
};
