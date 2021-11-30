import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { IsErrorOrLoading } from "../utils/IsErrorOrLoading";
import { useParams } from "react-router-dom";
import { useBlockHeightQuery } from "../../generated/graphql";
import { LegacyTransactionDetails } from "./LegacyTransactionDetail";
import { TransactionDetail } from "./TransactionDetail";
import { useQuery } from "@apollo/client";
import { gql } from "graphql.macro";

interface RouteParams {
  txId: string;
}

const BLOCK_TRANSACTION_QUERY = gql`
  query transaction($id: String!) {
    transaction(id: $id) {
      ... on TransactionWithBlockLegacy {
        block {
          isLegacy
          id
          height
          timestamp
          generatorPublicKey
          username
        }
        transaction {
          isLegacy
          id
          blockId
          type
          timestamp
          senderId
          recipientId
          amount
          fee
          signatures
          data
          senderUsername
          recipientUsername
        }
      }
      ... on TransactionWithBlock {
        id
        timestamp
        senderId
        recipientId
        amount
        fee
        data
        height
        moduleAssetId
        nonce
        isFinalized
        blockId
        senderUsername
        recipientUsername
        size
        votes {
          delegateAddress
          delegateUsername
          amount
        }
        blockId
        blockHeight
        blockTimestamp
        blockGeneratorPublicKey
        blockIsFinal
        blockAddress
        blockUsername
        tokenUnlock {
          amount
          username
          delegateAddress
          unvoteHeight
        }
        multisigRegistration {
          numberOfSignatures
          mandatoryKeys
          optionalKeys
        }
        pomData {
          username
          address
        }
      }
    }
  }
`;

export const TransactionDetailContainer: React.FC = () => {
  let { txId = "" } = useParams<RouteParams>();

  const {
    data: blockTransactionData,
    loading: blockTransactionLoading,
    error: blockTransactionError,
  } = useQuery(BLOCK_TRANSACTION_QUERY, {
    variables: {
      id: txId,
    },
    fetchPolicy: "no-cache",
  });

  const {
    data: blockData,
    loading: blockLoading,
    error: blockError,
  }: any = useBlockHeightQuery();

  if (
    blockTransactionLoading ||
    blockTransactionError ||
    blockLoading ||
    blockError
  ) {
    return (
      <div className="content">
        <IsErrorOrLoading
          error={!!blockTransactionError || !!blockError}
          title={"transactions"}
        />
      </div>
    );
  }
  const { block, transaction: legacyTransaction } =
    !blockTransactionLoading && blockTransactionData.transaction;
  const isLegacy = blockTransactionData.transaction?.block?.isLegacy;
  if (
    (!legacyTransaction || !legacyTransaction.id) &&
    (!blockTransactionData.transaction || !blockTransactionData.transaction.id)
  ) {
    return (
      <div className="content">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Transaction detail</CardTitle>
          </CardHeader>
          <CardBody>Oh no! No transaction found!</CardBody>
        </Card>
      </div>
    );
  }

  if (isLegacy) {
    return (
      <LegacyTransactionDetails
        txQuery={legacyTransaction}
        blockQuery={block}
      />
    );
  }

  const blockHeight = blockData?.lastBlock?.height
    ? blockData.lastBlock.height
    : 0;
  const confirmations = blockHeight - +blockTransactionData.transaction.height;
  return (
    <TransactionDetail
      confirmations={confirmations}
      txQuery={blockTransactionData}
    />
  );
};
