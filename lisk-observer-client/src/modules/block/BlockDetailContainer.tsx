import React from "react";
import "./style.css";
import { gql } from "apollo-boost";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { IsErrorOrLoading } from "../utils/IsErrorOrLoading";
import { LegacyBlockDetail } from "./LegacyBlockDetail";
import { CurrentBlockDetail } from "./CurrentBlockDetail";

interface RouteParams {
  blockId: string;
}

const BLOCK_QUERY = gql`
  query block($id: String) {
    block(id: $id) {
      ... on BlockLegacy {
        isLegacy
        id
        height
        numberOfTransactions
        totalAmount
        totalFee
        reward
        generatorPublicKey
        timestamp
        username
        address
      }
      ... on BlockWithTransactions {
        block {
          id
          height
          timestamp
          generatorPublicKey
          reward
          isFinal
          username
          address
        }
        transactions {
          id
          height
          moduleAssetId
          nonce
          blockId
          timestamp
          senderPublicKey
          senderId
          recipientId
          amount
          data
          size
          fee
          minFee
          senderUsername
          recipientUsername
        }
      }
    }
  }
`;

export const BlockDetailContainer: React.FC<{}> = () => {
  let { blockId } = useParams<RouteParams>();
  const {
    data: blockData,
    loading: blockLoading,
    error: blockError,
  } = useQuery(BLOCK_QUERY, {
    variables: {
      id: blockId,
    },
    fetchPolicy: "no-cache",
  });

  if (blockLoading || blockError) {
    return (
      <div className="content">
        <IsErrorOrLoading error={!!blockError} title={"Block"} />
      </div>
    );
  }

  const block = blockData.block.block;

  if (blockData.block.isLegacy) {
    return <LegacyBlockDetail block={blockData.block} />;
  }

  const transactions = blockData.block.transactions;
  return <CurrentBlockDetail transactions={transactions} block={block} />;
};
