import React from "react";
import { Col, Row } from "reactstrap";
import { TransactionWithBlock } from "../../../generated/graphql";
import { MultisigElement } from "../../multisig/MultisigElement";

interface Props {
  tx: TransactionWithBlock;
}

export const MultisigMetadata: React.FC<Props> = ({ tx }) => {
  return (
    <Col md={12}>
      <Row>
        <Col md={4}>
          <h3 className="m-0">Multisig details</h3>
        </Col>
      </Row>
      <Row>
        <MultisigElement
          numberOfSignatures={tx.multisigRegistration?.numberOfSignatures!}
          mandatoryKeys={tx.multisigRegistration?.mandatoryKeys as string[]}
          optionalKeys={tx.multisigRegistration?.optionalKeys as string[]}
        />
      </Row>
    </Col>
  );
};
