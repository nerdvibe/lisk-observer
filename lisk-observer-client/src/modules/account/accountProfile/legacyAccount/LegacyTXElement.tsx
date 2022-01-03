import React from "react";
import { displayBigNumber } from "../../../utils/lisk/utils/lisk/beddowsToDecimal";
import { Badge } from "reactstrap";
import moment from "moment";
import { Link } from "react-router-dom";
import { truncateMidString } from "../../../utils/strings/strings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sanitizeString } from "../../../utils/strings/censor";
import { Copy } from "../../../../UI/copy/Copy";
import { fromLiskEpoch } from "../../../utils/lisk/utils/lisk/time";

const txDirectionsDict = {
  in: "success",
  out: "danger",
  self: "dark",
};

interface Props {
  id: string;
  timestamp: string;
  senderUsername: string;
  senderId: string;
  recipientUsername: string;
  recipientId: string;
  amount: string;
  fee: string;
  addressContext: string;
  transferData: string;
  type: number;
  setAddressContextReact: (address: string) => void;
}

export const LegacyTXElement: React.FC<Props> = ({
  id,
  timestamp,
  senderUsername,
  senderId,
  recipientUsername,
  recipientId,
  amount,
  fee,
  addressContext,
  transferData,
  type,
  setAddressContextReact,
}) => {
  let txDirection: "in" | "out" | "self" =
    senderId === addressContext ? "out" : "in";
  txDirection =
    senderId === addressContext && recipientId === addressContext
      ? "self"
      : txDirection;
  const hasDataIcon = !!transferData ? "fas" : "far";

  let realRecipient: any = null;
  switch (type) {
    case 0:
      realRecipient = "";
      break;
    case 1:
      realRecipient = "Second signature creation";
      break;
    case 2:
      realRecipient = "Delegate registration";
      break;
    case 3:
      realRecipient = "Delegate vote";
      break;
    case 4:
      realRecipient = "Multisig registration";
      break;
    default:
      realRecipient = "Unsupported transaction";
  }

  return (
    <tr>
      <th scope="row" className={txDirectionsDict[txDirection]}>
        <FontAwesomeIcon
          data-tip={sanitizeString(transferData)}
          className="fa font-s mr-1"
          icon={[hasDataIcon, "comment"]}
        />
        <Link to={`/transaction/${id}`}>{truncateMidString(id)}</Link>{" "}
        <Copy text={id} />
      </th>
      <td>
        {moment(fromLiskEpoch(+timestamp)).format("D/MM/YYYY - HH:mm:ss")}
      </td>
      <td>
        {txDirection === "in" ? (
          <span>
            <Link
              to={`/account/${senderId}`}
              onClick={() => setAddressContextReact(senderId)}
            >
              {truncateMidString(senderUsername || senderId)}
            </Link>{" "}
            <Copy text={id} />
          </span>
        ) : (
          <strong>
            {truncateMidString(senderUsername || senderId)}{" "}
            <Copy text={senderId} />
          </strong>
        )}{" "}
      </td>
      <td>
        {txDirection === "out" && type === 0 ? (
          <span>
            <Link
              to={`/account/${recipientId}`}
              onClick={() => setAddressContextReact(recipientId)}
            >
              {truncateMidString(recipientUsername || recipientId)}
            </Link>{" "}
            {<Copy text={recipientId} />}
          </span>
        ) : (
          <strong>
            {type === 0
              ? truncateMidString(recipientUsername || recipientId)
              : realRecipient}
            {type === 0 && <Copy text={recipientId} />}
          </strong>
        )}{" "}
      </td>
      <td>
        <Badge className={`badge-${txDirectionsDict[txDirection]} fs-medium`}>
          {displayBigNumber(amount || 0)} Ⱡ
        </Badge>
      </td>
      <td>{displayBigNumber(fee || 0)} Ⱡ</td>
    </tr>
  );
};
