import { ReactComponent as TransactionIcon } from "../blockchainOverview/lastTenTransactionsTable/icons/transaction.svg";
import { ReactComponent as MultisigIcon } from "../blockchainOverview/lastTenTransactionsTable/icons/multisig.svg";
import { ReactComponent as DelegateRegistrationIcon } from "../blockchainOverview/lastTenTransactionsTable/icons/delegateRegistration.svg";
import { ReactComponent as VoteIcon } from "../blockchainOverview/lastTenTransactionsTable/icons/vote.svg";
import { ReactComponent as UnsupportedIcon } from "../blockchainOverview/lastTenTransactionsTable/icons/unsupported.svg";
import { ReactComponent as TokenUnlock } from "../blockchainOverview/lastTenTransactionsTable/icons/tokenUnlock.svg";
import { ReactComponent as POMIcon } from "../blockchainOverview/lastTenTransactionsTable/icons/pom.svg";
import { ReactComponent as ClaimIcon } from "../blockchainOverview/lastTenTransactionsTable/icons/claim.svg";
import React from "react";
import { Badge } from "reactstrap";
import { TX_TYPES } from "../utils/const";

interface Props {
  type: string;
  confirmations: number;
  blockIsFinal: boolean;
}

export const TxIcon: React.FC<Props> = ({
  type,
  confirmations,
  blockIsFinal,
}) => {
  const txTypeBadge = (label: string, type: string = "info") => {
    return (
      <div>
        <Badge className={`badge-${type} tx-icon-badge`}>{label}</Badge>
      </div>
    );
  };

  const iconFill = blockIsFinal
    ? "#30c3a7"
    : document.body.classList.contains("white-content")
    ? "black"
    : "white";

  switch (type) {
    case TX_TYPES.TRANSACTION:
      return (
        <div className="mb-20">
          <TransactionIcon
            fill={iconFill}
            width={40}
            height={40}
            data-tip={`${confirmations} confirmations`}
          />
          {txTypeBadge("Normal transaction")}
        </div>
      );
    case TX_TYPES.MULTISIG_REG:
      return (
        <div className="mb-20">
          <MultisigIcon fill={iconFill} width={40} height={40} />
          {txTypeBadge("Multisig registration")}
        </div>
      );
    case TX_TYPES.REGISTER_DELEGATE:
      return (
        <div className="mb-20">
          <DelegateRegistrationIcon fill={iconFill} width={40} height={40} />
          {txTypeBadge("Delegate registration")}
        </div>
      );
    case TX_TYPES.VOTE:
      return (
        <div className="mb-20">
          <VoteIcon fill={iconFill} width={40} height={40} />
          {txTypeBadge("Vote transaction")}
        </div>
      );
    case TX_TYPES.TOKEN_UNLOCK:
      return (
        <div className="mb-20">
          <TokenUnlock fill={iconFill} width={40} height={40} />
          {txTypeBadge("Token unlock")}
        </div>
      );
    case TX_TYPES.POM_REPORT:
      return (
        <div className="mb-20">
          <POMIcon fill={iconFill} width={40} height={40} />
          {txTypeBadge("Misbehavior report")}
        </div>
      );
    case TX_TYPES.LEGACY_ADDRESS_CLAIM:
      return (
        <div className="mb-20">
          <ClaimIcon stroke={iconFill} width={40} height={40} />
          {txTypeBadge("Legacy address claim")}
        </div>
      );
    default:
      return (
        <div className="mb-20">
          <UnsupportedIcon fill={"green"} width={40} height={40} />
          {txTypeBadge("Unknown type")}
        </div>
      );
  }
};
