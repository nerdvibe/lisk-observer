import React, { useState } from "react";
import TransactionsFilters from "./TransactionsFilters";
import ReactTooltip from "react-tooltip";
import { Row, Col, Card, CardBody, CardHeader, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TransactionsRow } from "./TransactionRow";
import { IsErrorOrLoading } from "../utils/IsErrorOrLoading";
import { Pagination } from "../../UI/pagination/Pagination";
import { TX_TYPES } from "../utils/const";
import { usePaginatedTransactionsQuery } from "../../generated/graphql";
import { useScrollToTop } from "../utils/hooks";

export const Transactions: React.FC = () => {
  useScrollToTop();
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [TXType, setTXType] = useState<TX_TYPES>();
  const { data, loading, error } = usePaginatedTransactionsQuery({
    variables: {
      page,
      TXType,
    },
  });
  const totalDocs = data?.transactions?.pagination?.total!;
  const totalPages = Math.ceil(totalDocs / 50);

  if (error || loading) {
    return (
      <div className="content">
        <IsErrorOrLoading error={!!error} title={"transactions"} />
      </div>
    );
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col>
                    <h5 className="title">Transactions</h5>
                  </Col>
                  <Col>
                    <FontAwesomeIcon
                      icon={["fas", "sliders-h"]}
                      className="pointer float-right mr-4"
                      onClick={() => setShowFilters(!showFilters)}
                    />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="all-icons">
                <TransactionsFilters
                  isOpen={showFilters}
                  TXType={TXType}
                  setTXType={setTXType}
                />
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>From</th>
                      <th>To</th>
                      <th className="text-center">Amount</th>
                      <th className="text-center">Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    <TransactionsRow
                      transactions={data?.transactions?.data || []}
                    />
                  </tbody>
                </Table>
                <Row>
                  <Col md="12" className={"text-center"}>
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
