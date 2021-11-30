import React from "react";
import moment from "moment";
import { beddowsToDecimal } from "../utils/lisk/utils/lisk/beddowsToDecimal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";
import { AvatarSize, DelegateLogo } from "../utils/logos/DelegateLogo";
import { truncateMidString } from "../utils/strings/strings";
import { sanitizeString } from "../utils/strings/censor";
import { Copy } from "../../UI/copy/Copy";
import "./style.css";

interface Props {
  transactions: any[];
}

export const TransactionsRow: React.FC<Props> = ({ transactions }) => {
  const recipientField = (tx: any) => {
    let content: any = "";
    switch (tx.moduleAssetId) {
      case "2:0":
        let recipientLabel = tx.recipientUsername
          ? tx.recipientUsername
          : tx.recipientId;
        content = (
          <span>
            <Link to={`/account/${tx.recipientId}`}>
              <DelegateLogo
                delegateName={tx.recipientUsername || tx.recipientId}
                address={tx.recipientId}
                size={AvatarSize.SMALL}
                className="mr-2"
              />
              {truncateMidString(recipientLabel, 15)}
            </Link>{" "}
            <Copy text={tx.recipientId} />
          </span>
        );
        break;
      case "4:0":
        content = "Multisig registration";
        break;
      case "5:0":
        content = "Delegate registration";
        break;
      case "5:1":
        content = "Delegate vote";
        break;
      case "5:2":
        content = "Token unlock";
        break;
      case "5:3":
        content = "Misbehavior report";
        break;
      case "1000:0":
        content = "Legacy address claim";
        break;
      default:
        content = "unsupported transaction";
    }
    return content;
  };

  return (
    <>
      {transactions.map((tx: any) => {
        const hasDataIcon = !!tx.data ? "fas" : "far";
        let senderLabel =
          tx.senderUsername || tx.senderId || tx.senderPublicKey;
        return (
          <tr key={tx.id}>
            <td>
              <FontAwesomeIcon
                data-tip={sanitizeString(tx.data)}
                className="fa font-m ml-1"
                icon={[hasDataIcon, "comment"]}
              />
              <Link to={`/transaction/${tx.id}`}>
                {truncateMidString(tx.id)}
              </Link>{" "}
              <Copy text={tx.id} />
            </td>
            <td>
              {moment(tx.timestamp * 1000).format("D/MM/YYYY - HH:mm:ss")}
            </td>
            <td>
              <Link to={`/account/${tx.senderId}`}>
                <DelegateLogo
                  delegateName={tx.recipientUsername || tx.recipientId}
                  address={tx.recipientId}
                  size={AvatarSize.SMALL}
                  className="mr-2"
                />
                {truncateMidString(senderLabel, 20)}
              </Link>{" "}
              <Copy text={tx.senderId} />
            </td>
            <td>{recipientField(tx)}</td>
            <td className="text-center">
              <Badge className={"badge-dark font-m"}>
                {beddowsToDecimal(
                  tx.amount > 0 ? tx.amount : tx.voteAmount || 0,
                  2
                ).toLocaleString()}{" "}
                Ⱡ
              </Badge>
            </td>
            <td className="text-center">
              {beddowsToDecimal(tx.fee > 0 ? tx.fee : 0, 2).toLocaleString()} Ⱡ
            </td>
          </tr>
        );
      })}
    </>
  );
};
