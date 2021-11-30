import React from "react";
import { Row, Col } from "reactstrap";

interface Props {
  mdVotes: number;
  txVotes: React.FC[];
  txUnvotes: React.FC[];
}

export const VotersUnvoters: React.FC<Props> = ({
  mdVotes,
  txVotes,
  txUnvotes,
}) => {
  return (
    <>
      <Row className="p-1">
        <Col md={mdVotes + 1} className="left-half-pill votes-col">
          <div>{txVotes.map((el) => el)}</div>
        </Col>
        <Col md={`${10 - mdVotes + 1}`} className="right-half-pill unvotes-col">
          <div>{txUnvotes.map((el) => el)}</div>
        </Col>
      </Row>
    </>
  );
};
