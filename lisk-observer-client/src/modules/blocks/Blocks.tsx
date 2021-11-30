import React, { useState } from "react";
import { Row, Col, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { Spinner } from "../../UI/spinner/Spinner";
import ReactTooltip from "react-tooltip";
import { BlockRow } from "./BlockRow";
import { Stars } from "../../UI/Stars";
import { Pagination } from "../../UI/pagination/Pagination";
import { usePaginatedBlocksQuery } from "../../generated/graphql";
import { useScrollToTop } from "../utils/hooks";
import "./style.css";

export const Blocks: React.FC = () => {
  const [page, setPage] = useState(1);
  useScrollToTop();
  const { data, loading, error } = usePaginatedBlocksQuery({
    variables: {
      page,
    },
  });

  if (error) {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Blocks</CardTitle>
                </CardHeader>
                <CardBody>Error while fetching the blocks</CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
  if (loading) {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Blocks</CardTitle>
                  <CardBody>
                    <CardTitle tag="h4">
                      <Spinner /> Loading the last blocks
                    </CardTitle>
                  </CardBody>
                </CardHeader>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }

  const totalDocs = data?.lastBlocks?.pagination?.total!;
  const totalPages = Math.ceil(totalDocs / 20);

  return (
    <>
      <Stars />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Blocks</h5>
              </CardHeader>
              <CardBody className="all-icons">
                <BlockRow blocks={data?.lastBlocks?.data || []} />
                <Row>
                  <Col md="12">
                    <Pagination
                      page={page}
                      totalPages={totalPages}
                      setPage={setPage}
                    />
                  </Col>
                </Row>
                <ReactTooltip />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
