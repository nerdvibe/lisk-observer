import React from "react";
import KnownScam from "./KnownScam";
import KnownLiskHQ from "./KnownLiskHQ";
import KnownExhanges from "./KnownExchange";
import { Row, Col } from "reactstrap";
import { IsErrorOrLoading } from "../utils/IsErrorOrLoading";
import { useKnownAddressesQuery } from "../../generated/graphql";
import { useScrollToTop } from "../utils/hooks";

export const KnownAddresses: React.FC = () => {
  const {
    data: knownAddressesData,
    loading: knownAddressesLoading,
    error: knownAddressesError,
  } = useKnownAddressesQuery();

  useScrollToTop();

  if (knownAddressesLoading || knownAddressesError) {
    return (
      <div className="content">
        <IsErrorOrLoading
          error={!!knownAddressesError}
          title={"Known Addresses"}
        />
      </div>
    );
  }

  const addresses = knownAddressesData?.knownAddresses || [];
  console.log(addresses, "addresses");

  return (
    <div className="content">
      <div className="react-notification-alert-container"></div>
      <Row>
        <Col xs={12} xl={6}>
          <KnownExhanges knownAddresses={addresses as any} />
        </Col>
        <Col xs={12} xl={6}>
          <KnownLiskHQ knownAddresses={addresses as any} />
          <KnownScam knownAddresses={addresses as any} />
        </Col>
      </Row>
    </div>
  );
};
