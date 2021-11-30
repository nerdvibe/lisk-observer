import React from "react";
import { Col } from "reactstrap";
import { TransactionWithBlock } from "../../../generated/graphql";
import { Link } from "react-router-dom";
import { beddowsToDecimal } from "../../utils/lisk/utils/lisk/beddowsToDecimal";
import { VotersUnvoters } from "../../../UI/components/VotersUnvoters";

interface Props {
  tx: TransactionWithBlock;
}

export const VotesMetadata: React.FC<Props> = ({ tx }) => {
  const votes = tx.votes!.map((value: any) => {
    const data = {
      username: value.delegateUsername,
      address: value.delegateAddress,
      amount: value.amount,
      kind: "",
    };
    data.kind = +value.amount > 0 ? "vote" : "unvote";
    return { ...data };
  });
  let plusVotes = 0;
  for (let i in votes) if (votes[i].kind === "vote") plusVotes++;
  const txVotes = votes
    .map(
      (v: any) =>
        v.kind === "vote" && (
          <Link className={"text-white"} to={`/account/${v.address}`}>
            {v.username} ({beddowsToDecimal(v.amount).toLocaleString()} Ⱡ)
          </Link>
        )
    )
    .filter((a: any) => a !== false);
  const txUnvotes = votes
    .map(
      (v: any) =>
        v.kind === "unvote" && (
          <Link className={"text-white"} to={`/account/${v.address}`}>
            {v.username} ({beddowsToDecimal(v.amount).toLocaleString()} Ⱡ)
          </Link>
        )
    )
    .filter((a: any) => a !== false);
  const mdVotes = Math.floor((plusVotes * 100) / votes.length / 10);
  return (
    <>
      <Col md={11} className="m-1">
        <h3 className="m-0">Votes</h3>
        <VotersUnvoters
          mdVotes={mdVotes}
          txVotes={txVotes as any}
          txUnvotes={txUnvotes as any}
        />
      </Col>
    </>
  );
};
