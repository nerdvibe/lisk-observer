import { sanitizeString } from "../../utils/strings/censor";
import { Col } from "reactstrap";
import React from "react";
import { hexToString } from "../../utils/strings/strings";

interface Props {
  tx: any;
}

export const TXMetadataLegacy: React.FC<Props> = ({ tx }) => {
  if (tx.type === 0 && tx.transferData) {
    const sanitizedData = sanitizeString(hexToString(tx.transferData));
    return (
      <>
        <Col md={2}>TX data:</Col>
        <Col md={10}>
          <strong>{sanitizedData}</strong>
        </Col>
      </>
    );
  }
  if (
    tx.type === 2 &&
    tx.asset &&
    tx.asset.delegate &&
    tx.asset.delegate.username
  ) {
    return (
      <>
        <Col md={4} />
        <Col md={2}>Registered delegate:</Col>
        <Col md={4}>
          <strong>{tx.asset.delegate.username}</strong>
        </Col>
        <Col md={2} />
      </>
    );
  }
  if (tx.type === 3 && tx.asset && tx.asset.votes) {
    return (
      <>
        <Col md={11} className="m-1"></Col>
      </>
    );
  }
  if (tx.type === 4) {
    return (
      <>
        <Col md={3}>Raw asset:</Col>
        <Col md={9}>
          <pre>{JSON.stringify(JSON.parse(tx.asset), null, 2)}</pre>
        </Col>
      </>
    );
  }

  return (
    <Col md={12} className={"text-center"}>
      No metadata included in this transaction
    </Col>
  );
};
