import React from "react";
import { generateAffiliationLabel } from "../../utils/delegateAffiliation";
import { beddowsToDecimal } from "../../utils/lisk/utils/lisk/beddowsToDecimal";
import { Badge } from "reactstrap";
import moment from "moment";
import { Link } from "react-router-dom";
import { truncateMidString } from "../../utils/strings/strings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sanitizeString } from "../../utils/strings/censor";
import { TX_TYPES } from "../../utils/const";
import { Copy } from "../../../UI/copy/Copy";

const txDirectionsDict = {
  in: "success",
  out: "danger",
  self: "dark",
};

interface Props {
  id: string;
  timestamp: string;
  sender: string;
  senderId: string;
  recipient: string;
  recipientId: string;
  amount: string;
  fee: string;
  confirmations: number;
  senderAffiliation: string;
  recipientAffiliation: string;
  addressContext: string;
  transferData: string;
  type: string;
  setAddressContextReact: (address: string) => void;
}

export const TXElement: React.FC<Props> = ({
  id,
  timestamp,
  sender,
  senderId,
  recipient,
  recipientId,
  amount,
  fee,
  confirmations,
  senderAffiliation,
  recipientAffiliation,
  addressContext,
  transferData,
  type,
  setAddressContextReact,
}) => {
  const senderAffiliationLabels = generateAffiliationLabel(senderAffiliation);
  const recipientAffiliationLabels = generateAffiliationLabel(
    recipientAffiliation
  );
  let txDirection: "in" | "out" | "self" =
    senderId === addressContext ? "out" : "in";
  txDirection =
    senderId === addressContext && recipientId === addressContext
      ? "self"
      : txDirection;
  const hasDataIcon = !!transferData ? "fas" : "far";

  let realRecipient: any = null;
  switch (type) {
    case TX_TYPES.TRANSACTION:
      realRecipient = recipientAffiliationLabels;
      break;
    case TX_TYPES.MULTISIG_REG:
      realRecipient = "Multisig registration";
      break;
    case TX_TYPES.REGISTER_DELEGATE:
      realRecipient = "Delegate registration";
      break;
    case TX_TYPES.VOTE:
      realRecipient = "Delegate vote";
      break;
    case TX_TYPES.TOKEN_UNLOCK:
      realRecipient = "Token unlock";
      break;
    case TX_TYPES.POM_REPORT:
      realRecipient = "Misbehavior report";
      break;
    case TX_TYPES.LEGACY_ADDRESS_CLAIM:
      realRecipient = "Legacy address claim";
      break;
    default:
      realRecipient = "unsupported transaction";
  }

  return (
    <tr>
      <th scope="row" className={txDirectionsDict[txDirection]}>
        <FontAwesomeIcon
          data-tip={sanitizeString(transferData)}
          className="fa font-s mr-2 fs-s"
          icon={[hasDataIcon, "comment"]}
        />
        <Link to={`/transaction/${id}`}>{truncateMidString(id)}</Link>{" "}
        <Copy text={id} />
      </th>
      <td>{moment(+timestamp * 1000).format("D/MM/YYYY - HH:mm:ss")}</td>
      <td>
        {txDirection === "in" ? (
          <span>
            <Link
              to={`/account/${senderId}`}
              onClick={() => setAddressContextReact(senderId)}
            >
              {truncateMidString(sender)}
            </Link>{" "}
            <Copy text={id} />
          </span>
        ) : (
          <strong>
            {truncateMidString(sender)} <Copy text={senderId} />
          </strong>
        )}{" "}
        {senderAffiliationLabels}
      </td>
      <td>
        {txDirection === "out" && type === TX_TYPES.TRANSACTION ? (
          <span>
            <Link
              to={`/account/${recipientId}`}
              onClick={() => setAddressContextReact(recipientId)}
            >
              {truncateMidString(recipient)}
            </Link>{" "}
            {<Copy text={recipientId} />}
          </span>
        ) : (
          <strong>
            {type === TX_TYPES.TRANSACTION
              ? truncateMidString(recipient)
              : realRecipient}
            {type === TX_TYPES.TRANSACTION && <Copy text={recipient} />}
          </strong>
        )}{" "}
      </td>
      <td>
        <Badge className={`badge-${txDirectionsDict[txDirection]} fs-medium`}>
          {+beddowsToDecimal(!!amount ? amount : 0).toLocaleString()} Ⱡ
        </Badge>
      </td>
      <td>{(+beddowsToDecimal(!!fee ? fee : 0)).toLocaleString()} Ⱡ</td>
      <td>{confirmations}</td>
    </tr>
  );
};
