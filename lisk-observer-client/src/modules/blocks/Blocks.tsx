import React, { useState } from "react";
import { Row, Col, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { Spinner } from "../../UI/spinner/Spinner";
import ReactTooltip from "react-tooltip";
import { BlockRow } from "./BlockRow";
import { Pagination } from "../../UI/pagination/Pagination";
import { usePaginatedBlocksQuery } from "../../generated/graphql";
import { useScrollToTop } from "../utils/hooks";
import "./style.css";
import { useHistory, useParams } from "react-router-dom";
import { AccountContainerParams } from "../account/accountProfile/AccountContainer";
import { IsErrorOrLoading } from "../utils/IsErrorOrLoading";

const Blocks: React.FC = () => {
  let { page: pageParam } = useParams<AccountContainerParams>();
  const history = useHistory();
  const [page, setPage] = useState(
    pageParam && !isNaN(+pageParam) ? +pageParam : 1
  );
  useScrollToTop();
  const { data, loading, error } = usePaginatedBlocksQuery({
    variables: {
      page,
    },
  });

  const changePage = (selectedPage: number) => {
    setPage(selectedPage);
    history.replace(`/blocks/${selectedPage}`);
  };

  if (error || loading) {
    return (
      <div>
        <IsErrorOrLoading error={!!error} title={" the last blocks"} />
      </div>
    );
  }

  const totalDocs = data?.lastBlocks?.pagination?.total!;
  const totalPages = Math.ceil(totalDocs / 20);

  return (
    <>
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
                      setPage={changePage}
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

export default Blocks;
