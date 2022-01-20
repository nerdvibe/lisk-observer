import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import { DelegatesRow } from "./DelegatesRow";
import { IsErrorOrLoading } from "../utils/IsErrorOrLoading";
import ReactTooltip from "react-tooltip";
import "./style.css";
import { useInterval } from "../customHooks/useInterval";
import moment from "moment";
import { NextForgers } from "./NextForgers";
import { DelegateStats } from "./DelegatesStats";
import { SortableTh } from "./SortableTh";
import { SortingTypes, sortTableColumn, TableColumns } from "./utils/sorting";
import { beddowsToDecimal } from "../utils/lisk/utils/lisk/beddowsToDecimal";
import MockData from "./mock.json";
import { NumberCard } from "../../UI/components/NumberCard";
import {
  useBlockHeightQuery,
  useDelegatesListQuery,
} from "../../generated/graphql";
import { useIntersection, useScrollToTop } from "../utils/hooks";
import TelescopeAnimation from "../../UI/assets/telescope.svg";

const DEFAULT_DELEGATES_LIMIT = 130;

const DelegatesList: React.FC = () => {
  const [dataFetched, setDataFetched] = useState(false);
  const [sortingType, setSortingType] = useState(SortingTypes.ASC);
  const [sortedColumn, setSortedColumn] = useState(TableColumns.RANK);
  const [delegatesLimit, setDelegatesLimit] = useState(DEFAULT_DELEGATES_LIMIT);
  const [delegatesData, setDelegatesData] = useState<any>({
    supply: 0,
    locked: 0,
    promises: [],
    delegates: {
      total: 0,
      delegates: [],
    },
  });
  useScrollToTop();
  const { data, loading, error } = useDelegatesListQuery({
    pollInterval: 5000,
    onCompleted: () => {
      if (data) {
        const queryData = JSON.parse(JSON.stringify(data));
        const { supply, locked, promises } = queryData.delegates;
        const { total, delegates } = queryData.delegates.delegates;
        let dataToMerge = {
          ...delegatesData,
          supply: supply || 0,
          locked: locked || 0,
          promises: promises || [],
          delegates: {
            total: total || 0,
            delegates,
          },
        };
        mergeQueryDataIntoMock(dataToMerge);
        setRealShare(dataToMerge);
        setDelegatesData(dataToMerge as any);
      }
    },
    variables: {
      limit: delegatesLimit,
    },
  });
  const ref = useRef();
  const inViewport = useIntersection(ref, "0px"); // Trigger as soon as the element becomes visible

  const increaseLimit = useCallback(() => {
    if (inViewport && data) {
      if (!loading && !error) {
        setDelegatesLimit(delegatesLimit + 50);
      }
    }
  }, [data]);

  useEffect(() => {
    if (inViewport) {
      increaseLimit();
    }
  }, [inViewport]);

  const getStakePercentage = (
    totalStake: string | number | null = 0,
    locked: string | number | null = 0
  ) => {
    if (totalStake && locked) {
      const stakePercentage: any = +(
        (+beddowsToDecimal(locked) / +totalStake) *
        100
      ).toFixed(0);
      return stakePercentage;
    }
    return 0;
  };

  const setRealShare = (delegatesList: any) => {
    const realShareList = delegatesList.promises;
    delegatesList.delegates.delegates.map((delegate: any) => {
      const delegateShare = realShareList.find(
        (share: any) =>
          share.address === delegate.address ||
          share.username === delegate.username
      );
      if (delegateShare) {
        delegate.realShare = (+delegateShare.averageShared).toFixed(2);
        delegate.promisedShare = (+delegateShare.promisedShare).toFixed(2);
      }
      return delegate;
    });
  };

  const totalSupply = useMemo(() => {
    return parseInt(delegatesData.supply).toLocaleString();
  }, [delegatesData]);
  const stakedLisk = useMemo(() => {
    return parseInt(
      beddowsToDecimal(delegatesData.locked).toString()
    ).toLocaleString();
  }, [delegatesData]);
  const totalDelegates = useMemo(() => {
    return delegatesData.delegates.total;
  }, [delegatesData]);
  const stakePercentage = useMemo(() => {
    return getStakePercentage(delegatesData.supply, delegatesData.locked);
  }, [delegatesData]);

  const mergeQueryDataIntoMock = (delegatesList: any) => {
    const mergedDelegates: any = [];
    delegatesList.delegates.delegates.map((validator: any) => {
      const queryDelegate = MockData.validators.find(
        (delegate: any) => validator.publickey === delegate.address
      );
      return mergedDelegates.push({ ...validator, ...queryDelegate });
    });
    if (delegatesList?.delegates?.delegates) {
      delegatesList.delegates.delegates = mergedDelegates;
      delegatesList = { ...delegatesData, ...MockData, ...delegatesList };
    }
  };
  const { data: blockData } = useBlockHeightQuery({
    fetchPolicy: "cache-only",
  });
  // TODO : Add interface
  const [sortedList, setSortedList] = useState<any[]>([]);
  const [timestamps, setTimestamps] = useState<{
    [key: string]: { when: number; text: string };
  }>({});
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
    if (delegatesData?.delegates?.delegates) {
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
  }, [sortingType, sortedColumn, delegatesData, dataFetched]);

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [sortedList]);

  const setSortingParameters = (column: TableColumns, sort: SortingTypes) => {
    setSortedColumn(column);
    setSortingType(sort);
  };

  const delegates: any[] = data?.delegates?.delegates?.delegates || [];
  const delegatesSorted = [...delegates]
    .sort(
      (a: any, b: any) =>
        a.dpos.delegate.nextForgingTime - b.dpos.delegate.nextForgingTime
    )
    .filter(
      (delegate: any) =>
        !delegate.dpos.delegate.isBanned &&
        delegate.dpos.delegate.nextForgingTime * 1000 > new Date().getTime()
    );

  const greenDelegates = delegates.filter(
    (d) =>
      +d?.dpos?.delegate?.consecutiveMissedBlocks === 0 &&
      d?.dpos?.delegate?.isConsensusParticipant
  ).length;

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

  const loadingOrError =
    delegatesData.delegates.delegates.length === 0 ||
    (!dataFetched && (error || loading));

  return (
    <>
      {loadingOrError ? (
        <div className="content">
          <IsErrorOrLoading error={!!error} title={"delegates"} />
        </div>
      ) : (
        <div className="content">
          <div className="react-notification-alert-container"></div>
          <Row>
            <Col md="3">
              <NumberCard
                data={`${totalSupply} LSK`}
                title={"Total Supply"}
                icon={""}
              />
            </Col>
            <Col md="3">
              <NumberCard
                data={`${stakedLisk} LSK`}
                title={"Staked Lisk"}
                icon={""}
              />
            </Col>
            <Col md="3">
              <NumberCard
                data={totalDelegates}
                title={"Total Delegates"}
                icon={""}
              />
            </Col>
            <Col md="3">
              <NumberCard
                data={`${stakePercentage}%`}
                title={"% of LSK staked"}
                icon={""}
              />
            </Col>
            <Col md="6">
              <NextForgers delegates={delegatesSorted as any} />
            </Col>
            <Col md="6">
              <DelegateStats
                totalDelegates={delegatesData?.delegates?.total}
                greenDelegates={greenDelegates}
              />
            </Col>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                    Delegates
                    <p className="category">
                      Top delegates by Rank - % Share provided by Lisk.Vote and
                      Lemii
                    </p>
                  </CardTitle>
                </CardHeader>
                <CardBody>
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
                        const forgingTime =
                          delegate?.dpos?.delegate?.nextForgingTime;
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
                            missedBlocks={
                              delegate.dpos?.delegate.consecutiveMissedBlocks
                            }
                            producedBlocks={
                              delegate.dpos?.delegate.producedBlocks
                            }
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
                            selfVote={
                              delegate.dpos?.delegate?.selfVotesAmount || 0
                            }
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
            </Col>
          </Row>
        </div>
      )}
      {
        // @ts-ignore
        <div className="fetch-more" ref={ref}></div>
      }
    </>
  );
};

export default DelegatesList;
