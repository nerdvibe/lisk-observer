import React from "react";
import { ReactComponent as TransactionIcon } from "../blockchainOverview/lastTenTransactionsTable/icons/transaction.svg";
import { ReactComponent as MultisigIcon } from "../blockchainOverview/lastTenTransactionsTable/icons/multisig.svg";
import { ReactComponent as DelegateRegistrationIcon } from "../blockchainOverview/lastTenTransactionsTable/icons/delegateRegistration.svg";
import { ReactComponent as VoteIcon } from "../blockchainOverview/lastTenTransactionsTable/icons/vote.svg";
import { ReactComponent as UnsupportedIcon } from "../blockchainOverview/lastTenTransactionsTable/icons/unsupported.svg";
import { ReactComponent as SecondSignatureIcon } from "../blockchainOverview/lastTenTransactionsTable/icons/secondSignature.svg";
import { Badge } from "reactstrap";

export const TxIconLegacy = (tx: any) => {
  const txTypeBadge = (label: string) => {
    return (
      <div>
        <Badge className={"badge-info tx-icon-badge"}>{label}</Badge>
      </div>
    );
  };
  switch (tx.type) {
    case 0:
      return (
        <div className="mb-20">
          <TransactionIcon fill={"white"} width={40} height={40} />
          {txTypeBadge("Normal transaction")}
          <Badge className="badge-info fw-400">Legacy transaction</Badge>
        </div>
      );
    case 1:
      return (
        <div className="mb-20">
          <SecondSignatureIcon fill={"green"} width={40} height={40} />
          {txTypeBadge("Second signature")}
          <Badge className="badge-info fw-400">Legacy transaction</Badge>
        </div>
      );
    case 2:
      return (
        <div className="mb-20">
          <DelegateRegistrationIcon fill={"green"} width={40} height={40} />
          {txTypeBadge("Delegate registration")}
          <Badge className="badge-info fw-400">Legacy transaction</Badge>
        </div>
      );
    case 3:
      return (
        <div className="mb-20">
          <VoteIcon fill={"green"} width={40} height={40} />
          {txTypeBadge("Vote transaction")}
          <Badge className="badge-info fw-400">Legacy transaction</Badge>
        </div>
      );
    case 4:
      return (
        <div className="mb-20">
          <MultisigIcon fill={"green"} width={40} height={40} />
          {txTypeBadge("Multisig registration")}
          <Badge className="badge-info fw-400">Legacy transaction</Badge>
        </div>
      );
    default:
      return (
        <div className="mb-20">
          <UnsupportedIcon fill={"green"} width={40} height={40} />
          {txTypeBadge("Unknown type")}
          <Badge className="badge-info fw-400">Legacy transaction</Badge>
        </div>
      );
  }
};
