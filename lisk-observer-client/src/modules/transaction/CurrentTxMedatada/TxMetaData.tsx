import { sanitizeString } from "../../utils/strings/censor";
import { Col, Row, Card } from "reactstrap";
import React from "react";
import { TransactionWithBlock } from "../../../generated/graphql";
import { TX_TYPES } from "../../utils/const";
import { MultisigMetadata } from "./MultisigMetadata";
import { VotesMetadata } from "./VotesMetadata";
import { TokenUnlockMetadata } from "./TokenUnlockMetadata";
import { PoMMetadata } from "./PoMMetadata";

interface Props {
  tx: TransactionWithBlock;
}

export const TXMetadata: React.FC<Props> = ({ tx }) => {
  if (tx.moduleAssetId === TX_TYPES.TRANSACTION && tx.data) {
    const sanitizedData = sanitizeString(tx.data);
    return (
      <>
        <Col md={2}>TX data:</Col>
        <Col md={10}>
          <strong>{sanitizedData}</strong>
        </Col>
      </>
    );
  }
  if (tx.moduleAssetId === TX_TYPES.REGISTER_DELEGATE) {
    return (
      <Col md={{ size: 6, offset: 3 }}>
        <div className={"alert alert-dark"}>
          <Row>
            <Col md={6}>Registered delegate:</Col>
            <Col md={6}>
              <strong>{tx.senderUsername}</strong>
            </Col>
          </Row>
        </div>
      </Col>
    );
  }
  if (tx.moduleAssetId === TX_TYPES.VOTE) {
    return <VotesMetadata tx={tx} />;
  }
  if (tx.moduleAssetId === TX_TYPES.MULTISIG_REG) {
    return <MultisigMetadata tx={tx} />;
  }
  if (tx.moduleAssetId === TX_TYPES.TOKEN_UNLOCK) {
    return <TokenUnlockMetadata tx={tx} />;
  }
  if (tx.moduleAssetId === TX_TYPES.POM_REPORT) {
    return <PoMMetadata tx={tx} />;
  }

  return (
    <Col md={12} className={"text-center"}>
      {tx.data ? (
        <Card>
          <pre className="json-output">{tx.data}</pre>
        </Card>
      ) : (
        "No metadata included in this transaction"
      )}
    </Col>
  );
};
