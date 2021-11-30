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

const KnownExhanges = ({ knownAddresses }: Props) => (
  <Card className="">
    <CardHeader>
      <Row>
        <Col xs={10}>
          <CardTitle className={"d-inline"}>
            <h4 className={""}> Known Exchange Addresses </h4>
            <p className="category">
              A list of the known exchanges addresses on Lisk
            </p>
          </CardTitle>
        </Col>
      </Row>
    </CardHeader>
    <CardBody>
      <div className="table-full-width table-responsive">
        <Table>
          <tbody>
            {knownAddresses!
              .filter((a: any) => a.isExchange)
              .map((knownAddress: any) => {
                return (
                  <KnownAddressElement
                    key={knownAddress.address}
                    address={knownAddress.address}
                    tag={knownAddress.tag}
                    balance={knownAddress.balance}
                    isExchange={true}
                    identifier={knownAddress.identifier}
                  />
                );
              })}
          </tbody>
        </Table>
      </div>
    </CardBody>
  </Card>
);

export default KnownExhanges;
