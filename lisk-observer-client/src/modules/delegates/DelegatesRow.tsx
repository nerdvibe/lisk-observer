import React, { useMemo } from "react";
import { beddowsToDecimal } from "../utils/lisk/utils/lisk/beddowsToDecimal";
import { generateAffiliationLabel } from "../utils/delegateAffiliation";
import { AvatarSize, DelegateLogo } from "../utils/logos/DelegateLogo";
import { delegateStatusColor } from "./utils/colorStatus";
import { Link } from "react-router-dom";
import RowCell from "./RowCell";
import { MIN_SELF_VOTE_PERCENT, MIN_WEIGHT_STANDBY } from "../utils/const";
import {
  calculateTargetDate,
  OFFSET_KIND,
} from "../utils/lisk/blockOffsets/calculateDate";
import FavoriteButton from "../../UI/components/favoriteButton/FavoriteButton";

interface Props {
  rank: string;
  rankAdjusted: string;
  address: string;
  missedBlocks: string;
  producedBlocks: string;
  rewards: string;
  PoM: string[];
  vote: string;
  consensusWeight: string;
  isBanned: boolean;
  username: string;
  affiliation: string;
  nextForgingTime: string;
  selfVote: number;
  willForge: boolean;
  liskStats?: any;
  percentOfSupply?: number | string;
  term?: string;
  height: number;
  realShare?: number;
  promisedShare?: number;
}

export const DelegatesRow: React.FC<Props> = ({
  rank,
  rankAdjusted,
  address,
  missedBlocks,
  producedBlocks,
  PoM,
  vote,
  consensusWeight,
  username,
  isBanned,
  affiliation,
  selfVote,
  nextForgingTime,
  willForge,
  percentOfSupply,
  height,
  realShare,
  promisedShare,
}) => {
  const affiliationLabels = generateAffiliationLabel(affiliation);

  let isMinimumWeightForStandby =
    +beddowsToDecimal(consensusWeight) >= MIN_WEIGHT_STANDBY;
  let isActivePoMs = false;
  PoM?.forEach((pom: string) => {
    const targetDate = calculateTargetDate(pom, height || 0, OFFSET_KIND.POM);
    if (!isActivePoMs) {
      isActivePoMs = new Date().getTime() < targetDate.timestamp;
    }
  });

  const maxVotes = (+selfVote / MIN_SELF_VOTE_PERCENT) * 100;
  const available = +maxVotes - +vote;
  const usedCapacity = ((available * 100) / maxVotes).toFixed(2);

  let forgingInLabel = "Stand-by";

  if (!isMinimumWeightForStandby) {
    forgingInLabel = "Not enough votes";
  }

  if (isBanned) {
    forgingInLabel = "❌ Banned";
  }
  if (willForge) {
    forgingInLabel = nextForgingTime;
  }
  if (isActivePoMs) {
    forgingInLabel = "Punished!";
  }

  const missedBlocksLabel =
    +missedBlocks > 0 ? `${missedBlocks} missed blocks` : "";

  return useMemo(() => {
    return (
      <tr className={`delegate-row ${isBanned ? " is-banned" : ""}`}>
        <RowCell mainItem={`${rankAdjusted}`} extraClass="rank-column" />
        <RowCell
          mainItem={
            <FavoriteButton alt address={address} username={username} />
          }
        />
        <RowCell
          mainItem={
            <>
              <Link className="delegate-username" to={`/account/${address}`}>
                <strong>{username}</strong>
              </Link>{" "}
            </>
          }
          dataTip={missedBlocksLabel}
          image={
            <DelegateLogo
              delegateName={username}
              address={address}
              className="delegate-image"
              generateRandom={true}
              size={AvatarSize.MEDIUM}
            />
          }
          extraClass="mw-200"
        />
        <RowCell mainItem={`${affiliationLabels}`} />
        <RowCell
          mainItem={
            <>
              {delegateStatusColor(
                rank,
                isBanned,
                !!+missedBlocks,
                willForge,
                isActivePoMs,
                isMinimumWeightForStandby,
                missedBlocksLabel
              )}
              {forgingInLabel}
            </>
          }
          dataTip={missedBlocksLabel}
        />
        <RowCell
          mainItem={promisedShare ? `${promisedShare}%` : "-"}
          subItem={realShare ? `${realShare}%` : "-"}
          dataTip={`Declared share / Real share`}
        />
        <RowCell
          mainItemBold={true}
          mainItem={`${(+beddowsToDecimal(
            consensusWeight
          )).toLocaleString()} Ⱡ`}
          subItem={`${(+beddowsToDecimal(
            selfVote
          )).toLocaleString()} Ⱡ selfvote`}
        />
        <RowCell
          mainItem={`${(+beddowsToDecimal(vote)).toLocaleString()} Ⱡ`}
          subItem={`${percentOfSupply}% of supply`}
          dataTip={missedBlocksLabel}
        />
        <RowCell mainItem={`${producedBlocks} Blocks`} />
        <RowCell mainItem={`${PoM.length} PoMs`} />
        <RowCell
          extraClass={"text-right"}
          mainItem={`${
            isNaN(+usedCapacity) || +usedCapacity < 0 ? "0" : usedCapacity
          } %`}
          dataTip={`${(+beddowsToDecimal(
            available
          )).toLocaleString()} LSK in voting capacity remaining`}
        />
      </tr>
    );
  }, [forgingInLabel, username, address]);
};
