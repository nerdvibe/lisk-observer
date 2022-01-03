import React, { useEffect, useState } from "react";
import TransactionsFilters from "./TransactionsFilters";
import ReactTooltip from "react-tooltip";
import { Row, Col, Card, CardBody, CardHeader, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TransactionsRow } from "./TransactionRow";
import { Stars } from "../../UI/Stars";
import { IsErrorOrLoading } from "../utils/IsErrorOrLoading";
import { Pagination } from "../../UI/pagination/Pagination";
import { TX_TYPES } from "../utils/const";
import { usePaginatedTransactionsQuery } from "../../generated/graphql";
import { useScrollToTop } from "../utils/hooks";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { AccountContainerParams } from "../account/accountProfile/AccountContainer";

function useQueryParams() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const Transactions: React.FC = () => {
  const query = useQueryParams();
  useScrollToTop();
  let { page: pageParam } = useParams<AccountContainerParams>();
  const [page, setPage] = useState(
    pageParam && !isNaN(+pageParam) ? +pageParam : 1
  );
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
  const history = useHistory();

  const changePage = (selectedPage: number) => {
    setPage(selectedPage);
    history.replace(`/transactions/${selectedPage}`);
  };

  useEffect(() => {
    checkUrlFilter();
  });

  const isTxType = (text: string) =>
    Object.values(TX_TYPES).reduce(
      (prev, current) => prev || text === current,
      false
    );

  const checkUrlFilter = () => {
    const urlType = query.get("type");
    if (urlType && urlType?.toLocaleLowerCase() !== TXType) {
      if (isTxType(urlType.toLowerCase())) {
        window.scrollTo(0, 0);
        setTXType(urlType.toLowerCase() as TX_TYPES);
      } else {
        query.delete("type");
        history.replace({
          search: query.toString(),
        });
        setTXType(undefined);
      }
    }
  };

  const changeTXType = (type: TX_TYPES) => {
    setTXType(type);
    query.set("type", type);
    history.replace({
      search: query.toString(),
    });
  };

  if (error || loading) {
    return (
      <div className="content">
        <IsErrorOrLoading error={!!error} title={"transactions"} />
      </div>
    );
  }

  return (
    <>
      <Stars />
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
                  setTXType={changeTXType}
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
