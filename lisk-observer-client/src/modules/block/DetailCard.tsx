import React from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";

interface Props {
  title: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}
export const DatailCard: React.FC<Props> = ({ title, children, icon }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">
          <Row>
            <Col>{title}</Col>
            <Col>{icon}</Col>
          </Row>
        </CardTitle>
        <CardBody className="white-text">{children}</CardBody>
      </CardHeader>
    </Card>
  );
};
