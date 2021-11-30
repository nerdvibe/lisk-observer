import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from "reactstrap";
import {
  useKnownAddressesQuery,
  useRichListQuery,
} from "../../generated/graphql";
import { Pagination } from "../../UI/pagination/Pagination";
import { AccountContainerParams } from "../account/accountProfile/AccountContainer";
import { SortableTh } from "../delegates/SortableTh";
import {
  SortingTypes,
  sortRichListColumn,
  TableColumns,
} from "../delegates/utils/sorting";
import { useScrollToTop } from "../utils/hooks";
import { IsErrorOrLoading } from "../utils/IsErrorOrLoading";
import { beddowsToDecimal } from "../utils/lisk/utils/lisk/beddowsToDecimal";
import AccountRow from "./AccountRow";

export const RichList = () => {
  let { page } = useParams<AccountContainerParams>();
  const [sortedList, setSortedList] = useState<any[]>([]);
  const [sortingType, setSortingType] = useState(SortingTypes.DESC);
  const [sortedColumn, setSortedColumn] = useState(TableColumns.BALANCE);
  const [highestPercentage, setHighestPercentage] = useState(0);
  const [pagination, setPagination] = useState(page ? +page : 1);
  const history = useHistory();
  useScrollToTop();
  const {
    data: knownAddresses,
    loading: knownAddressesLoading,
  } = useKnownAddressesQuery();
  const { data, loading, error } = useRichListQuery({
    pollInterval: 5000,
    variables: {
      page: pagination,
    },
  });

  const setAccountsAlias = useCallback(
    (richList: any[]) => {
      knownAddresses?.knownAddresses?.map((knownAddress) => {
        const index =
          data?.richList?.accounts?.data?.findIndex(
            (account: any) => account.address === knownAddress?.address
          ) || -1;
        if (index >= 0) {
          richList[index].username = knownAddress?.tag;
          richList[index].identifier = knownAddress?.identifier;
        }
      });
    },
    [data, knownAddresses]
  );

  useEffect(() => {
    if (
      data?.richList?.accounts?.data &&
      data?.richList?.accounts?.data.length > 0
    ) {
      const richListRaw = JSON.parse(
        JSON.stringify(data?.richList?.accounts?.data)
      );
      setAccountsAlias(richListRaw);
      setSortedList(sortRichListColumn(richListRaw, sortedColumn, sortingType));
      ReactTooltip.rebuild();
    }
  }, [data, sortingType, sortedColumn, setAccountsAlias]);

  useEffect(() => {
    if (
      data?.richList?.accounts?.data &&
      data?.richList.accounts?.data?.length > 0
    ) {
      let maxPercentage = highestPercentage;
      data?.richList.accounts?.data.forEach((delegate: any) => {
        const percentage =
          (+beddowsToDecimal(delegate.balance) * 100) /
          (data?.richList?.supply || 0);
        maxPercentage = percentage > maxPercentage ? percentage : maxPercentage;
      });
      setHighestPercentage(maxPercentage);
    }
  }, [data, highestPercentage]);

  const setSortingParameters = (column: TableColumns, sort: SortingTypes) => {
    setSortedColumn(column);
    setSortingType(sort);
  };

  const handlePagination = (newPage: number) => {
    setPagination(newPage);
    history.push(`/rich-list/${newPage}`);
  };

  if (loading || error || knownAddressesLoading) {
    return (
      <div className="content">
        <IsErrorOrLoading error={!!error} title={"transactions"} />;
      </div>
    );
  }

  return (
    <>
      <div className="content">
        <div className="react-notification-alert-container"></div>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
                  Rich List
                  <p className="category">Top accounts by Amount</p>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Rank</th>
                      <th>Account</th>
                      <SortableTh
                        className="balance-column"
                        activeHeader={sortedColumn}
                        column={TableColumns.BALANCE}
                        setSorting={setSortingParameters}
                        sortingType={sortingType}
                      >
                        Balance
                      </SortableTh>
                      <th className="percentage-th">% of Circulating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedList.map((delegate: any, index: number) => {
                      const percentage =
                        (+beddowsToDecimal(delegate.balance) * 100) /
                        (data?.richList?.supply || 0);
                      return (
                        <AccountRow
                          highestPercentage={highestPercentage}
                          address={delegate.address}
                          delegatee={delegate.address}
                          unlocked={+beddowsToDecimal(delegate.unlocked) || "0"}
                          balance={+beddowsToDecimal(delegate.balance) || "0"}
                          username={delegate.username || delegate.address}
                          rank={
                            data?.richList?.accounts?.pagination?.from! +
                            (index + 1)
                          }
                          percentage={percentage}
                          identifier={delegate.identifier}
                        />
                      );
                    })}
                  </tbody>
                </Table>
                <Row>
                  <Col md={12}>
                    <Pagination
                      page={pagination}
                      totalPages={
                        data?.richList?.accounts?.pagination?.lastPage || 1
                      }
                      setPage={handlePagination}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
