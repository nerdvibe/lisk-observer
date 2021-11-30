import React from "react";
import { Badge, Card, CardBody, CardText, Col, Row } from "reactstrap";
import {
  calculateTargetDate,
  OFFSET_KIND,
} from "../../../../utils/lisk/blockOffsets/calculateDate";
import { useBlockHeightQuery } from "../../../../../generated/graphql";

interface Props {
  poms?: string[] | undefined;
}

export const PoMElement: React.FC<Props> = ({ poms = [] }) => {
  const { data: blockData } = useBlockHeightQuery({
    fetchPolicy: "cache-only",
  });

  const height = blockData?.lastBlock?.height;
  if (!height) {
    return <h2>"Component not available"</h2>;
  }
  return (
    <Card className="card-user">
      <CardBody className="no-min-height">
        <CardText />
        <div className="author">
          <h5 className="title">
            {poms?.length ? `This Account has a received a PoM` : "No PoMs"}
          </h5>
        </div>
        <div className="card-description">
          <Row>
            <Col md={12}>
              {poms?.map((pom: string) => {
                const kind = OFFSET_KIND.POM;
                const targetDate = calculateTargetDate(pom, height, kind);
                const isActive = new Date().getTime() < targetDate.timestamp;
                return (
                  <Row>
                    <Col md={12}>
                      <Badge
                        className={`badge-dark font-m ${
                          isActive ? "text-danger" : `text-warning`
                        } pom-element`}
                      >
                        {isActive ? "⛔️Active" : "💤Past"} PoM{" "}
                        {isActive ? "until" : "expired"} on{" "}
                        {targetDate.targetDateFormat}
                      </Badge>
                    </Col>
                  </Row>
                );
              })}
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>
  );
};
