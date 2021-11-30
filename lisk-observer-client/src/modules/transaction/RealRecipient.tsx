import React from "react";
import { Link } from "react-router-dom";

export const RealRecipient = (tx: any) => {
  if (tx.moduleAssetId) {
    switch (tx.moduleAssetId) {
      case "2:0":
        return (
          <Link to={`/account/${tx.recipientId}`}>
            <strong>{tx.recipientUsername || tx.recipientId}</strong>
          </Link>
        );
      case "4:0":
        return <strong>Multisig registration</strong>;
      case "5:0":
        return <strong>Delegate registration</strong>;
      case "5:1":
        return <strong>Delegate vote</strong>;
      case "5:2":
        return <strong>Token unlock</strong>;
      case "5:3":
        return <strong>Misbehavior report</strong>;
      case "1000:0":
        return <strong>Legacy address claim</strong>;
      default:
        return <strong>unsupported transaction</strong>;
    }
  }
  if (tx.type === 0 || tx.type) {
    switch (tx.type) {
      case 0:
        return (
          <Link to={`/account/${tx.recipientId}`}>
            <strong>{tx.recipientId}</strong>
          </Link>
        );
      case 1:
        return <strong>Second signature creation</strong>;
      case 2:
        return <strong>Delegate registration</strong>;
      case 3:
        return <strong>Delegate vote</strong>;
      case 4:
        return <strong>Multisig registration</strong>;
      default:
        return <strong>Unsupported transaction</strong>;
    }
  }
};
