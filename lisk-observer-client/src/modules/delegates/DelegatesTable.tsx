import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { Card, CardBody, CardHeader, CardTitle, Table } from "reactstrap";
import { useBlockHeightQuery } from "../../generated/graphql";
import { useInterval } from "../customHooks/useInterval";
import { MIN_WEIGHT_STANDBY } from "../utils/const";
import {
  calculateTargetDate,
  OFFSET_KIND,
} from "../utils/lisk/blockOffsets/calculateDate";
import { beddowsToDecimal } from "../utils/lisk/utils/lisk/beddowsToDecimal";
import { isNotInDelegatesList } from "../utils/strings/strings";
import { DelegatesRow } from "./DelegatesRow";
import { SortableTh } from "./SortableTh";
import { sortTableColumn, TableColumns } from "./utils/sorting";
import TelescopeAnimation from "../../UI/assets/telescope.svg";

enum Filters {
  ALL = "all",
  ACTIVE = "active",
  STANDBY = "standby",
  PUNISHED = "punished",
  BANNED = "banned",
  NO_ENOUGH_VOTES = "not-enough-votes",
}

function useQueryParams() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const DelegatesTable = ({
  delegatesData,
  setDataFetched,
  dataFetched,
  sortedColumn,
  sortingType,
  data,
  setSortingParameters,
  delegatesLimit,
  totalDelegates,
}: any) => {
  const query = useQueryParams();
  const history = useHistory();
  const [filtering, setFiltering] = useState(Filters.ALL);
  const [sortedList, setSortedList] = useState<any[]>([]);
  const [timestamps, setTimestamps] = useState<{
    [key: string]: { when: number; text: string };
  }>({});
  const { data: blockData } = useBlockHeightQuery({
    fetchPolicy: "cache-only",
  });

  useEffect(() => {
    if (sortedList.length === 0 && delegatesData?.delegates?.delegates) {
      if (!dataFetched) {
        setDataFetched(true);
      }
      setSortedList(
        sortTableColumn(
          delegatesData?.delegates?.delegates,
          sortedColumn,
          sortingType
        )
      );
    }
  }, [delegatesData]);

  useEffect(() => {
    if (delegatesData?.delegates?.delegates) {
      setSortedList(
        sortTableColumn(
          delegatesData?.delegates?.delegates,
          sortedColumn,
          sortingType
        )
      );
    }
  }, [sortingType, sortedColumn, dataFetched]);

  const consensusPercentage = (
    consensusWeight: number,
    totalConsensus: string | number
  ) => {
    if (consensusWeight && totalConsensus) {
      return (
        (+beddowsToDecimal(consensusWeight) /
          +beddowsToDecimal(totalConsensus)) *
        100
      ).toFixed(2);
    }
    return 0;
  };

  const checkIsActivePoMs = (PoM: any[], height: number) => {
    const nowTimestamp = new Date().getTime();
    let isActivePoMs = false;
    PoM?.forEach((pom: string) => {
      const { timestamp: targetTimestamp } = calculateTargetDate(
        +pom * 1000,
        height || 0,
        OFFSET_KIND.POM
      );
      if (!isActivePoMs) {
        isActivePoMs = isActivePoMs || nowTimestamp < targetTimestamp;
      }
    });
    return isActivePoMs;
  };

  const activeDelegates = useMemo(() => {
    return data?.delegates?.delegates?.delegates?.filter(
      (delegate: any) =>
        +(delegate?.dpos?.delegate?.nextForgingTime || 0) > 0 || false
    );
  }, [data]);

  const bannedDelegates = useMemo(() => {
    return data?.delegates?.delegates?.delegates?.filter(
      (delegate: any) =>
        isNotInDelegatesList(activeDelegates || [], delegate?.address || "") &&
        delegate?.dpos?.delegate?.isBanned
    );
  }, [data]);

  const punishedDelegates = useMemo(() => {
    const height = +(blockData?.lastBlock?.height || 0);
    const punished = data?.delegates?.delegates?.delegates?.filter(
      (delegate: any) => {
        const pom = delegate?.dpos?.delegate?.pomHeights || [];
        return (
          isNotInDelegatesList(
            activeDelegates || [],
            delegate?.address || ""
          ) && checkIsActivePoMs(pom, height)
        );
      }
    );
    return punished;
  }, [data, blockData]);

  const standbyDelegates = useMemo(() => {
    return data?.delegates?.delegates?.delegates?.filter(
      (delegate: any) =>
        isNotInDelegatesList(bannedDelegates || [], delegate?.address || "") &&
        isNotInDelegatesList(activeDelegates || [], delegate?.address || "") &&
        isNotInDelegatesList(bannedDelegates || [], delegate?.address || "") &&
        isNotInDelegatesList(
          punishedDelegates || [],
          delegate?.address || ""
        ) &&
        +beddowsToDecimal(delegate?.dpos?.delegate?.consensusWeight || 0) >=
          MIN_WEIGHT_STANDBY
    );
  }, [data]);

  const notEnoughVotesDelegates = useMemo(() => {
    return data?.delegates?.delegates?.delegates?.filter(
      (delegate: any) =>
        isNotInDelegatesList(activeDelegates || [], delegate?.address || "") &&
        isNotInDelegatesList(bannedDelegates || [], delegate?.address || "") &&
        isNotInDelegatesList(standbyDelegates || [], delegate?.address || "") &&
        isNotInDelegatesList(punishedDelegates || [], delegate?.address || "")
    );
  }, [data]);

  const timestampsLocal: { [key: string]: { when: number; text: string } } = {};

  useInterval(() => {
    Object.keys(timestampsLocal).forEach((key) => {
      timestampsLocal[key] = {
        when: timestampsLocal[key].when,
        text: moment(timestampsLocal[key].when * 1000).fromNow(),
      };
    });
    setTimestamps(timestampsLocal);
  }, 1000);

  useEffect(() => {
    const sortRows = (delegates: any[]) => {
      const data = sortTableColumn(delegates, sortedColumn, sortingType);
      return data;
    };
    if (data?.delegates?.delegates?.delegates) {
      switch (filtering) {
        case Filters.ACTIVE:
          setSortedList(sortRows(activeDelegates || []));
          break;
        case Filters.BANNED:
          setSortedList(sortRows(bannedDelegates || []));
          break;
        case Filters.NO_ENOUGH_VOTES:
          setSortedList(sortRows(notEnoughVotesDelegates || []));
          break;
        case Filters.PUNISHED:
          setSortedList(sortRows(punishedDelegates || []));
          break;
        case Filters.STANDBY:
          setSortedList(sortRows(standbyDelegates || []));
          break;
        default:
          setSortedList(sortRows(data?.delegates?.delegates?.delegates || []));
          break;
      }
    }
  }, [data, filtering, sortingType, sortedColumn]);

  const changeFilter = (filter: Filters) => {
    setFiltering(filter);
    query.set("filter", filter);
    history.replace({
      search: query.toString(),
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">
          Delegates
          <p className="category">
            Top delegates by Rank - % Share provided by Lisk.Vote and Lemii
          </p>
        </CardTitle>
      </CardHeader>
      <CardBody>
        {Object.values(Filters).map((filter, index) => {
          return (
            <>
              {index !== 0 ? " | " : ""}
              <span
                className={`pointer ${
                  filtering === filter ? "white-text" : ""
                }`}
                onClick={() => changeFilter(filter)}
              >
                {(filter[0].toUpperCase() + filter.substr(1)).replaceAll(
                  "-",
                  " "
                )}
              </span>
            </>
          );
        })}
        <Table responsive>
          <thead>
            <tr>
              <SortableTh
                className="mw-60"
                activeHeader={sortedColumn}
                column={TableColumns.RANK}
                setSorting={setSortingParameters}
                sortingType={sortingType}
              >
                Rank
              </SortableTh>
              <th></th>
              <SortableTh
                activeHeader={sortedColumn}
                column={TableColumns.DELEGATE_NAME}
                setSorting={setSortingParameters}
                sortingType={sortingType}
              >
                Delegate
              </SortableTh>
              <th></th>
              <SortableTh
                activeHeader={sortedColumn}
                column={TableColumns.STATUS}
                setSorting={setSortingParameters}
                sortingType={sortingType}
                width={"15%"}
              >
                Status
              </SortableTh>
              <SortableTh
                activeHeader={sortedColumn}
                column={TableColumns.SHARE}
                setSorting={setSortingParameters}
                sortingType={sortingType}
              >
                Share
              </SortableTh>
              <SortableTh
                activeHeader={sortedColumn}
                column={TableColumns.SELF_VOTES}
                setSorting={setSortingParameters}
                sortingType={sortingType}
              >
                Actual weight
              </SortableTh>
              <SortableTh
                activeHeader={sortedColumn}
                column={TableColumns.SELF_VOTES}
                setSorting={setSortingParameters}
                sortingType={sortingType}
              >
                Total weight
              </SortableTh>
              <SortableTh
                activeHeader={sortedColumn}
                column={TableColumns.PRODUCED_BLOCKS}
                setSorting={setSortingParameters}
                sortingType={sortingType}
              >
                Produced Blocks
              </SortableTh>
              <SortableTh
                activeHeader={sortedColumn}
                column={TableColumns.POM}
                setSorting={setSortingParameters}
                sortingType={sortingType}
              >
                Misbehaviours
              </SortableTh>
              {/* <th>Term</th> */}
              <SortableTh
                activeHeader={sortedColumn}
                column={TableColumns.VOTE_CAPACITY}
                setSorting={setSortingParameters}
                sortingType={sortingType}
                className={"text-right"}
              >
                Vote Capacity
              </SortableTh>
            </tr>
          </thead>
          <tbody>
            <ReactTooltip />
            {sortedList.map((delegate: any) => {
              const forgingTime = delegate?.dpos?.delegate?.nextForgingTime;
              timestampsLocal[delegate.username] = {
                when: forgingTime,
                text: moment(forgingTime * 1000).fromNow(),
              };
              const percentOfSupply = consensusPercentage(
                delegate.dpos?.delegate.totalVotesReceived || 0,
                delegatesData.locked
              );

              return (
                <DelegatesRow
                  rank={delegate.dpos?.delegate.rank}
                  rankAdjusted={delegate.dpos?.delegate.rankAdjusted}
                  address={delegate.address}
                  missedBlocks={delegate.dpos?.delegate.consecutiveMissedBlocks}
                  producedBlocks={delegate.dpos?.delegate.producedBlocks}
                  rewards={0 || "delegate.rewards"}
                  consensusWeight={
                    delegate.dpos.delegate.consensusWeight || "0"
                  }
                  PoM={delegate.dpos.delegate.pomHeights || []}
                  vote={delegate.dpos.delegate.totalVotesReceived}
                  username={delegate.username}
                  affiliation={""}
                  isBanned={delegate.dpos?.delegate.isBanned}
                  nextForgingTime={
                    timestamps[delegate.username]
                      ? timestamps[delegate.username].text
                      : timestampsLocal[delegate.username].text
                  }
                  selfVote={delegate.dpos?.delegate?.selfVotesAmount || 0}
                  willForge={forgingTime > 0}
                  height={+(blockData?.lastBlock?.height || 0)}
                  key={delegate.address}
                  term={delegate.frequency}
                  percentOfSupply={percentOfSupply}
                  realShare={delegate.realShare}
                  promisedShare={delegate.promisedShare}
                />
              );
            })}
          </tbody>
        </Table>
        {delegatesLimit < totalDelegates && (
          <div className="fetch-more-container w-100">
            <div className=" w-50px mx-auto">
              <object
                className="telescope-icon loader-logo w-50px mx-auto"
                data={TelescopeAnimation}
                type="image/svg+xml"
                aria-label="lisk.observer logo"
              />
            </div>
            <div>
              <p className="text-center">Fetching more results</p>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default DelegatesTable;
