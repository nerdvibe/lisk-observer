import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from "reactstrap";
import { KnownAddressElement } from "./KnownAdressElement";

interface Props {
  knownAddresses?: any[];
}

const KnownScam = ({ knownAddresses }: Props) => {
  const addresses = knownAddresses!.filter((a: any) => a.isScam);

  if (!addresses.length) {
    return (
      <Card className="">
        <CardHeader>
          <Row>
            <Col xs={10}>
              <CardTitle className={"d-inline"}>
                <h4 className={""}> Known Scam Addresses </h4>
                <p className="category">
                  A list of the known scam addresses on Lisk
                </p>
              </CardTitle>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <div className="table-full-width table-responsive">
            <Table>
              <tbody>There aren't known scam addresses for now.</tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    );
  }
  return (
    <Card className="">
      <CardHeader>
        <Row>
          <Col xs={10}>
            <CardTitle className={"d-inline"}>
              <h4 className={""}> Known Scam Addresses </h4>
              <p className="category">
                A list of the known scam addresses on Lisk
              </p>
            </CardTitle>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <div className="table-full-width table-responsive">
          <Table>
            <tbody>
              {addresses.map((knownAddress: any) => {
                return (
                  <KnownAddressElement
                    key={knownAddress.address}
                    address={knownAddress.address}
                    tag={knownAddress.tag}
                    balance={knownAddress.balance}
                    isScam={true}
                  />
                );
              })}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

export default KnownScam;
