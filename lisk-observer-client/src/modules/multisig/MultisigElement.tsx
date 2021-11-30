import React from "react";
import { Col, Row } from "reactstrap";

interface Props {
  numberOfSignatures: number | string;
  mandatoryKeys?: string[] | null;
  optionalKeys?: string[] | null;
}

export const MultisigElement: React.FC<Props> = ({
  numberOfSignatures,
  mandatoryKeys = [],
  optionalKeys = [],
}) => {
  return (
    <div className={"alert alert-dark min-width-50"}>
      <Col md={12}>
        <Row>
          <Col md={3}>Min keys:</Col>
          <Col>
            <strong>{numberOfSignatures || 0}</strong>
          </Col>
        </Row>
      </Col>
      <Col md={12}>
        <Row>
          <Col md={3}>Required Keys:</Col>
          <Col>
            <strong>[</strong>
            {mandatoryKeys?.map((k) => <div className={"ml-3"}>{k}</div>) || ""}
            <strong>]</strong>
          </Col>
        </Row>
      </Col>
      <Col md={12}>
        <Row>
          <Col md={3}>Optional keys:</Col>
          <Col>
            <strong>[</strong>
            {optionalKeys?.map((k) => <div className={"ml-3"}>{k}</div>) || ""}
            <strong>]</strong>
          </Col>
        </Row>
      </Col>
    </div>
  );
};
