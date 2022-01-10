import React, { useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import ReactTooltip from "react-tooltip";
import { IsErrorOrLoading } from "../../utils/IsErrorOrLoading";
import moment from "moment";
import { Link } from "react-router-dom";
import { useInterval } from "../../customHooks/useInterval";
import { TransactionElement } from "./TransactionElement";
import { TX_TYPES } from "../../utils/const";
import { NoData } from "./NoTransactions";
import {
  useBlockHeightQuery,
  useLastTenTransactionsQuery,
} from "../../../generated/graphql";

export const LastTenTransactionsTable: React.FC = () => {
  const [fade, setFade] = useState<boolean>(true);
  const [firstId, setFirstId] = useState<string>("");
  const [timestamps, setTimestamps] = useState<{
    [key: string]: { when: number; text: string };
  }>({});
  const { data, loading, error } = useLastTenTransactionsQuery({
    pollInterval: 10000,
  });
  const {
    data: blockHeightData,
    loading: heightLoading,
    error: heightError,
  } = useBlockHeightQuery({
    pollInterval: 5000,
    fetchPolicy: "cache-only",
  });
  const timestampsLocal: { [key: string]: { when: number; text: string } } = {};
  const detectRecipient = (tx: any) => {
    switch (tx.moduleAssetId) {
      case TX_TYPES.TRANSACTION:
        return tx.recipientUsername || tx.recipientId;
      case TX_TYPES.MULTISIG_REG:
        return "Multisig registration";
      case TX_TYPES.REGISTER_DELEGATE:
        return "Delegate registration";
      case TX_TYPES.VOTE:
        return "Delegate vote";
      case TX_TYPES.TOKEN_UNLOCK:
        return "Token unlock";
      case TX_TYPES.POM_REPORT:
        return "Misbehavior report";
      case TX_TYPES.LEGACY_ADDRESS_CLAIM:
        return "Legacy address claim";
      default:
        return "unsupported transaction";
    }
  };
  const blockHeight = blockHeightData?.lastBlock?.height
    ? blockHeightData.lastBlock.height
    : 0;

  useInterval(() => {
    Object.keys(timestampsLocal).forEach((key) => {
      timestampsLocal[key] = {
        when: timestampsLocal[key].when,
        text: moment(timestampsLocal[key].when * 1000).fromNow(),
      };
    });
    setTimestamps(timestampsLocal);
  }, 1000);

  if (error || loading || heightLoading || heightLoading) {
    return (
      <>
        <IsErrorOrLoading
          error={!!error || !!heightError}
          title={"transactions"}
        />
      </>
    );
  }

  if (!data?.transactions?.data?.length) {
    return <NoData />;
  }
  if (
    data?.transactions?.data[0] &&
    data?.transactions?.data[0].id !== firstId
  ) {
    setFade(true);
    setFirstId(data.transactions.data[0].id);
    setTimeout(() => setFade(false), 4000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Last Transactions</CardTitle>
      </CardHeader>
      <CardBody>
        <Row className="last-ten-list-container">
          <Col md={12}>
            {data.transactions.data.map((tx: any, index: number) => {
              timestampsLocal[tx.id] = {
                when: tx.timestamp,
                text: moment(tx.timestamp * 1000).fromNow(),
              };

              return (
                <TransactionElement
                  fade={fade}
                  index={index}
                  key={index}
                  id={tx.id}
                  sender={tx.senderUsername || tx.senderId || "unavailable"}
                  senderAddress={tx.senderId}
                  recipient={detectRecipient(tx)}
                  recipientAddress={tx.recipientId || "unavailable"}
                  transferData={tx.data}
                  amount={tx.amount > 0 ? tx.amount : tx.voteAmount || 0}
                  type={tx.moduleAssetId || "unavailable"}
                  confirmations={+blockHeight - tx.height}
                  fee={tx.fee}
                  when={
                    timestamps[tx.id]
                      ? timestamps[tx.id].text
                      : timestampsLocal[tx.id].text
                  }
                />
              );
            })}
          </Col>
        </Row>
        <div className={"text-center"}>
          <Link to={"/transactions"} className={"btn-fill btn btn-secondary"}>
            See more transactions
          </Link>
        </div>
      </CardBody>
      <ReactTooltip />
    </Card>
  );
};
