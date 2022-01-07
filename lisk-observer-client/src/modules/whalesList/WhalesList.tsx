import moment from "moment";
import WhaleRow from "./WhalesRow";
import React, { useContext, useEffect, useState } from "react";
import { useScrollToTop } from "../utils/hooks";
import { useInterval } from "../customHooks/useInterval";
import { useHistory, useParams } from "react-router-dom";
import { Pagination } from "../../UI/pagination/Pagination";
import { IsErrorOrLoading } from "../utils/IsErrorOrLoading";
import { useWhaleTransactionsQuery } from "../../generated/graphql";
import { beddowsToDecimal } from "../utils/lisk/utils/lisk/beddowsToDecimal";
import { TickerContext, TickerValueContext } from "../../UI/layouts/BaseLayout";
import { AccountContainerParams } from "../account/accountProfile/AccountContainer";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from "reactstrap";
import { isUndefined } from "lodash";

const WhalesList = () => {
  useScrollToTop();
  const history = useHistory();
  let { page } = useParams<AccountContainerParams>();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [pagination, setPagination] = useState(page ? +page : 1);
  const [timestamps, setTimestamps] = useState<{
    [key: string]: { when: number; text: string };
  }>({});

  const { data, loading, error } = useWhaleTransactionsQuery({
    variables: {
      page: pagination,
    },
  });
  const {
    data: pricesData,
    loading: pricesLoading,
    error: pricesError,
  }: any = useContext(TickerValueContext);
  const ticker = useContext(TickerContext);
  const prices = pricesData?.lastTicks;
  const tickerPrice = (prices && prices[ticker]) || -1;
  const timestampsLocal: { [key: string]: { when: number; text: string } } = {};

  useInterval(() => {
    Object.keys(timestampsLocal).forEach((key) => {
      timestampsLocal[key] = {
        when: timestampsLocal[key].when,
        text: moment(timestampsLocal[key].when * 1000).fromNow(),
      };
    });
    setTimestamps(timestampsLocal);
  }, 1000);

  useEffect(() => {
    if (isUndefined(page) || (page && isNaN(parseInt(page)))) {
      handlePagination(1);
    }
  }, []);

  useEffect(() => {
    if (data) {
      const lastPage = data?.whaleTransactions?.pagination?.lastPage || 1;
      if (page && lastPage < +page) {
        handlePagination(1);
      }
      setTransactions(data?.whaleTransactions?.data || []);
    }
  }, [data]);

  const handlePagination = (newPage: number) => {
    setPagination(newPage);
    history.push(`/whale-transactions/${newPage}`);
  };

  if (loading || error || pricesLoading || pricesError) {
    return (
      <div className="content">
        <IsErrorOrLoading
          error={!!error || !!pricesError}
          title={"Whale transactions"}
        />
        ;
      </div>
    );
  }

  return (
    <>
      <div className="content">
        <div className="react-notification-alert-container"></div>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
                  Whale transactions
                  <p className="category">The latest largest transactions</p>
                </CardTitle>
              </CardHeader>
              <CardBody className="whale-transactions-table">
                <Table responsive>
                  <thead>
                    <tr>
                      <th></th>
                      <th className="mw-60">Amount</th>
                      <th className="mw-60">Sender</th>
                      <th></th>
                      <th className="mw-60">Receiver</th>
                      <th className="mw-60">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => {
                      const transactionAmount = +beddowsToDecimal(
                        transaction.amount
                      );
                      const currentValue = transactionAmount * tickerPrice;
                      timestampsLocal[transaction.id] = {
                        when: transaction.timestamp,
                        text: moment(transaction.timestamp * 1000).fromNow(),
                      };
                      const txDate = moment(
                        transaction.timestamp * 1000
                      ).format("D/MM/YYYY - HH:mm:ss");
                      return (
                        <WhaleRow
                          id={transaction.id}
                          amount={transactionAmount}
                          value={currentValue}
                          ticker={ticker}
                          sender={transaction.senderId}
                          senderName={transaction.senderUsername}
                          receiver={transaction.recipientId}
                          receiverName={transaction.recipientUsername}
                          date={txDate}
                          when={
                            timestamps[transaction.id]
                              ? timestamps[transaction.id].text
                              : timestampsLocal[transaction.id].text
                          }
                        />
                      );
                    })}
                  </tbody>
                </Table>
                <Row>
                  <Col md={12}>
                    <Pagination
                      page={pagination}
                      totalPages={
                        data?.whaleTransactions?.pagination?.lastPage || 1
                      }
                      setPage={handlePagination}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default WhalesList;
