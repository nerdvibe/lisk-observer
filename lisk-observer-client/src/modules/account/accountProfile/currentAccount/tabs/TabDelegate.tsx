import React from "react";
import {
  Keys,
  ReceivedVotes,
  SentVotes,
  Token,
  useBlockHeightQuery,
} from "../../../../../generated/graphql";
import { AccountVotesLarge, VOTE_KIND } from "../../AccountVotesLarge";
import { MultisigElement } from "../../../../multisig/MultisigElement";
import { beddowsToDecimal } from "../../../../utils/lisk/utils/lisk/beddowsToDecimal";
import { Badge, Col, Row } from "reactstrap";
import { Unlocking, UnlockingElement } from "../elements/UnlockingElements";
import "./style.css";
import { PoMElement } from "../elements/PoMElement";
import {
  calculateTargetDate,
  OFFSET_KIND,
} from "../../../../utils/lisk/blockOffsets/calculateDate";

interface Props {
  username?: string | null | undefined;
  pomHeights: any;
  consecutiveMissedBlocks?: number | null | undefined;
  lastForgedHeight?: number | null | undefined;
  isBanned?: boolean | null | undefined;
  totalVotesReceived?: string | null | undefined;
  selfVotesAmount?: number | null | undefined;
  rankAdjusted?: number | null | undefined;
  isConsensusParticipant?: boolean | null | undefined;
  minActiveHeight?: number | null | undefined;
  nextForgingTime?: number | null | undefined;
  producedBlocks?: number | null | undefined;
  sentVotes?: SentVotes | null | undefined;
  receivedVotes?: ReceivedVotes | null | undefined;
  unlocking?: Unlocking[] | null | undefined;
  nonce?: string | null | undefined;
  keys?: Keys | null | undefined;
  balance?: Token | null | undefined;
  setAddressContextReact: (address: string) => void;
  address: string;
}

export const TabDelegate: React.FC<Props> = ({
  username,
  pomHeights,
  consecutiveMissedBlocks,
  lastForgedHeight,
  isBanned,
  totalVotesReceived,
  selfVotesAmount,
  rankAdjusted,
  isConsensusParticipant,
  minActiveHeight,
  nextForgingTime,
  producedBlocks,
  sentVotes,
  receivedVotes,
  unlocking,
  nonce,
  keys,
  balance,
  address,
  setAddressContextReact,
}) => {
  const { data: blockData } = useBlockHeightQuery({
    fetchPolicy: "cache-only",
  });

  const KeyValueRow = ({ title, value }: { title: string; value: any }) => {
    return (
      <Row>
        <Col>
          <span className="account-data-label pt-2">{title}</span>
        </Col>
        <Col>
          <span className="account-data-value">
            <p>{value}</p>
          </span>
        </Col>
      </Row>
    );
  };

  let isActivePoMs = false;
  pomHeights?.forEach((pom: string) => {
    const targetDate = calculateTargetDate(
      pom,
      blockData?.lastBlock?.height || 0,
      OFFSET_KIND.POM
    );
    if (!isActivePoMs) {
      isActivePoMs = new Date().getTime() < targetDate.timestamp;
    }
  });

  return (
    <>
      <hr />
      <div>
        <div>
          <div>
            <h2 className="mt-3">Account</h2>
            <Row>
              <Col xs={12} xl={6}>
                <KeyValueRow
                  title="Liquid Balance"
                  value={
                    <Badge className={"badge-dark  text-success fs-medium"}>
                      {(+beddowsToDecimal(
                        balance!.balance || 0,
                        2
                      )).toLocaleString()}{" "}
                      Ⱡ
                    </Badge>
                  }
                />
                <KeyValueRow
                  title="Locked Balance"
                  value={
                    <>
                      <Badge className={"badge-dark fs-medium"}>
                        {(+beddowsToDecimal(
                          +(balance?.locked || 0),
                          2
                        )).toLocaleString()}{" "}
                        Ⱡ
                      </Badge>
                    </>
                  }
                />
                <KeyValueRow
                  title="Total Balance"
                  value={
                    <Badge className={"badge-dark fs-medium"}>
                      {(+beddowsToDecimal(
                        +(balance?.balance || 0) + +(balance?.locked || 0),
                        2
                      )).toLocaleString()}{" "}
                      Ⱡ
                    </Badge>
                  }
                />
                <KeyValueRow title="Nonce" value={nonce} />
              </Col>
              <Col xs={12} xl={6} className="unlocking-elements-container">
                <div className="mt-2">
                  <UnlockingElement
                    unlocks={unlocking as Unlocking[]}
                    setAddressContextReact={setAddressContextReact}
                    address={address}
                  />
                </div>
              </Col>
            </Row>
          </div>
          <hr />
          {username && (
            <>
              <h2 className="mt-3">Consensus Profile</h2>
              <Row>
                <Col xs={12} xl={6}>
                  {username && (
                    <>
                      <KeyValueRow title="Username" value={username} />
                      <KeyValueRow
                        title="Pom heights"
                        value={pomHeights.length ? pomHeights.join(" , ") : "0"}
                      />
                      <KeyValueRow
                        title="Consecutive missed blocks"
                        value={consecutiveMissedBlocks || 0}
                      />
                      <KeyValueRow
                        title="Last forged height"
                        value={lastForgedHeight || 0}
                      />
                      <KeyValueRow
                        title="Is punished"
                        value={<p> {isActivePoMs ? "⚠️ Yes!" : "No"} </p>}
                      />
                      <KeyValueRow
                        title="Is banned"
                        value={<p> {isBanned ? "❌ Yes!" : "No"}</p>}
                      />
                      <KeyValueRow title="Rank adjusted" value={rankAdjusted} />
                    </>
                  )}
                </Col>
                <Col xs={12} xl={6}>
                  <KeyValueRow
                    title="Total Votes Received"
                    value={
                      <p>
                        {beddowsToDecimal(
                          totalVotesReceived || 0,
                          2
                        ).toLocaleString()}{" "}
                        Ⱡ
                      </p>
                    }
                  />
                  <KeyValueRow
                    title="Total Self Vote"
                    value={
                      <p>
                        {" "}
                        {beddowsToDecimal(
                          selfVotesAmount || 0,
                          2
                        ).toLocaleString()}{" "}
                        Ⱡ
                      </p>
                    }
                  />
                  <KeyValueRow
                    title="Is Consensus participant"
                    value={<p>{isConsensusParticipant ? "🎉Yes" : "No"}</p>}
                  />
                  <KeyValueRow
                    title="Min active height"
                    value={<p> {minActiveHeight || "Never"}</p>}
                  />
                  <KeyValueRow
                    title="Next forging time"
                    value={<p> {nextForgingTime || "Never"}</p>}
                  />
                  <KeyValueRow
                    title="Produced blocks"
                    value={<p> {producedBlocks || "0"} Blocks</p>}
                  />
                </Col>
              </Row>
            </>
          )}
          <Row>
            <PoMElement poms={pomHeights} />
          </Row>
        </div>
        <hr />
      </div>
      <h1 className="show-mobile mt-3">Delegate details</h1>
      <div>
        <h2 className="mt-3">Votes</h2>
        <AccountVotesLarge
          title="Sent votes"
          votes={(sentVotes as SentVotes[]) || []}
          setAddressContextReact={setAddressContextReact}
          kind={VOTE_KIND.SENT}
        />{" "}
        <AccountVotesLarge
          title="Received votes"
          votes={(receivedVotes as ReceivedVotes[]) || []}
          setAddressContextReact={setAddressContextReact}
          kind={VOTE_KIND.RECEIVED}
        />{" "}
      </div>

      {!!keys?.numberOfSignatures && (
        <div>
          <hr />
          <h2 className="mt-3">Keys</h2>
          <MultisigElement
            numberOfSignatures={keys.numberOfSignatures}
            mandatoryKeys={keys.mandatoryKeys as string[]}
            optionalKeys={keys.optionalKeys as string[]}
          />
        </div>
      )}
    </>
  );
};
