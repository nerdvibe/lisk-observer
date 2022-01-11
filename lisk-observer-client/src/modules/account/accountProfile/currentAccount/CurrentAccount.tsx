import React, { useContext, useEffect, useState } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Nav,
  Row,
  TabContent,
  Table,
  TabPane,
} from "reactstrap";
import {
  ReceivedVotes,
  SentVotes,
  Token,
  useAccountInfoQuery,
} from "../../../../generated/graphql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TabDelegate } from "./tabs/TabDelegate";
import { Unlocking } from "./elements/UnlockingElements";
import { BlocksTab } from "./tabs/BlocksTab";
import { gql } from "graphql.macro";
import { useQuery } from "@apollo/client";
import { AccountContainerParams } from "../AccountContainer";
import { TXElement } from "../TXElement";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { CurrentAccountDetails } from "./CurrentAccountDetails";
import { AccountAlert } from "../AccountAlert";
import { BlockHeightContext } from "../../../../UI/layouts/BaseLayout";
import { AccountVotes, VOTE_KIND } from "../AccountVotes";
import { Ghost } from "../../../../UI/ghost/Ghost";
import { NoData } from "../noTransactions/NoData";
import { Pagination } from "../../../../UI/pagination/Pagination";
import { IsErrorOrLoading } from "../../../utils/IsErrorOrLoading";
import Fade from "react-reveal/Fade";
import "./style.css";

enum AccountTabs {
  NONE = "",
  TRANSACTIONS = "transactions",
  DETAILS = "details",
  BLOCKS = "blocks",
}

const ACCOUNT_TX = gql`
  query accountTransactions($address: String!, $page: Int!) {
    transactionsByAddress(address: $address, page: $page) {
      ... on PaginatedTransaction {
        pagination {
          total
          perPage
          lastPage
          to
        }
        data {
          id
          senderUsername
          recipientUsername
          recipientId
          amount
          fee
          data
          height
          senderId
          moduleAssetId
          minFee
          size
          blockId
          nonce
          timestamp
          voteAmount
          votes {
            delegateAddress
            delegateUsername
            amount
          }
        }
      }
    }
  }
`;

function useQueryParams() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const CurrentAccount: React.FC = () => {
  const query = useQueryParams();
  let { addressContext: addressContextParam, page } = useParams<
    AccountContainerParams
  >();
  const [activeTab, setActiveTab] = useState<AccountTabs>(
    AccountTabs.TRANSACTIONS
  );
  const [addressContextReact, setAddressContextReact] = useState<string>(
    addressContextParam?.toLocaleLowerCase() || ""
  );
  const { data: heightData }: any = useContext(BlockHeightContext);
  const [pagination, setPagination] = useState(page ? +page : 1);
  const history = useHistory();

  const {
    data: transactionsData,
    loading: transactionsLoading,
    error: transactionsError,
  } = useQuery(ACCOUNT_TX, {
    variables: {
      address: addressContextReact,
      page: pagination,
    },
  });

  const {
    data: accountData,
    loading: loadingAccountData,
    error: errorAccountData,
    refetch: accountRefetch,
  } = useAccountInfoQuery({
    variables: {
      addressContext: addressContextReact,
    },
  });

  useEffect(() => {
    if (page && +page !== +pagination) {
      setPagination(page ? +page : 1);
    }
    if (addressContextReact !== addressContextParam) {
      setAddressContextReact(addressContextParam);
      accountRefetch({
        addressContext: addressContextParam,
      });
    }
    checkUrlTab();
  });

  const isAccountTab = (text: string) =>
    Object.values(AccountTabs).reduce(
      (prev, current) => prev || text === current,
      false
    );

  const checkUrlTab = () => {
    const urlTab = query.get("tab");
    if (urlTab && urlTab?.toLocaleLowerCase() !== activeTab) {
      if (isAccountTab(urlTab.toLowerCase())) {
        window.scrollTo(0, 0);
        setActiveTab(urlTab.toLowerCase() as AccountTabs);
      } else {
        query.delete("tab");
        query.delete("section");
        history.replace({
          search: query.toString(),
        });
        setActiveTab(AccountTabs.TRANSACTIONS);
      }
    }
  };

  useEffect(() => {
    const section = query.get("section");
    const hasLoaded = !loadingAccountData && !transactionsLoading;
    if (hasLoaded && section?.toLocaleLowerCase() === "received") {
      const element = document.getElementById("votes-received");
      element?.scrollIntoView({ behavior: "smooth" });
    }
    if (hasLoaded && section?.toLocaleLowerCase() === "sent") {
      const element = document.getElementById("votes-sent");
      element?.scrollIntoView({ behavior: "smooth" });
    }
  }, [accountData, transactionsLoading, loadingAccountData, activeTab]);

  if (
    transactionsLoading ||
    transactionsError ||
    loadingAccountData ||
    errorAccountData
  ) {
    return (
      <div className="content">
        <IsErrorOrLoading
          error={!!errorAccountData || !!transactionsError}
          title={"account"}
        />
      </div>
    );
  }

  const handlePagination = (newPage: number) => {
    setPagination(newPage);
    history.push(`/account/${addressContextReact}/${newPage}`);
  };

  if (!accountData?.account?.address) {
    return (
      <div className="content">
        <Card className="card-chart">
          <CardHeader>
            <CardTitle tag="h4">Account</CardTitle>
          </CardHeader>
          <CardBody>
            <Ghost message={"No account found"} />
          </CardBody>
        </Card>
      </div>
    );
  }

  const changeTab = (tab: AccountTabs) => {
    setActiveTab(tab);
    query.set("tab", tab);
    query.delete("section");
    history.replace({
      search: query.toString(),
    });
  };

  if (!addressContextReact) {
    return (
      <div className="content">
        <Card className="card-chart">
          <CardHeader>
            <CardTitle tag="h4">Transactions</CardTitle>
            <CardBody>
              <CardTitle tag="h4">
                <Badge className={"badge-dark fs-medium"}>
                  {addressContextReact}
                </Badge>
                not found in the blockchain :(
              </CardTitle>
            </CardBody>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const transactions = transactionsData?.transactionsByAddress?.data;
  const accountInfo = accountData.account;
  const totalDocs =
    transactionsData?.transactionsByAddress?.pagination?.total || 0;
  const totalPages = Math.ceil(totalDocs / 25);
  const blockHeight = heightData?.lastBlock?.height
    ? heightData.lastBlock.height
    : 0;

  if (pagination > totalPages) {
    setPagination(0);
  }

  return (
    <>
      {accountInfo.dpos?.delegate?.isBanned ? (
        <AccountAlert
          msg={
            "This account has been banned by the consensus, do not delegate to this address"
          }
        />
      ) : null}
      <Row className={"d-block d-sm-none"}>
        <Col md="3">
          <>
            <CurrentAccountDetails
              address={accountInfo.address || ""}
              balance={accountInfo?.token?.balance || "0"}
              lockedBalance={accountInfo?.token?.locked || "0"}
              username={accountInfo?.username || ""}
              publicKey={accountInfo?.publicKey || "unknown"}
              multisig={accountInfo?.keys?.numberOfSignatures || "0"}
              votes={(accountInfo.dpos?.sentVotes as SentVotes[]) || []}
              totalVotesReceived={
                accountInfo.dpos?.delegate?.totalVotesReceived || "0"
              }
            />
          </>
        </Col>
      </Row>
      <Row>
        <Col md="9" id="test">
          <Card>
            <CardHeader>
              <Nav tabs>
                <Row className="w-100">
                  <Col xs={4}>
                    <div
                      className={`custom-tab ${
                        activeTab === AccountTabs.TRANSACTIONS
                          ? "active-tab"
                          : ""
                      }`}
                      onClick={() => changeTab(AccountTabs.TRANSACTIONS)}
                    >
                      <FontAwesomeIcon icon={"exchange-alt"} className="mr-2" />
                      <br className="show-laptop" />
                      <span className="hide-mobile">Transactions</span>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div
                      className={`custom-tab ${
                        activeTab === AccountTabs.BLOCKS ? "active-tab" : ""
                      }`}
                      onClick={() => changeTab(AccountTabs.BLOCKS)}
                    >
                      <FontAwesomeIcon icon={"cube"} className="mr-2" />
                      <br className="show-laptop" />
                      <span className="hide-mobile">Blocks</span>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div
                      className={`custom-tab ${
                        activeTab === AccountTabs.DETAILS ? "active-tab" : ""
                      }`}
                      onClick={() => changeTab(AccountTabs.DETAILS)}
                    >
                      <FontAwesomeIcon icon={"comment-dots"} className="mr-2" />
                      <br className="show-laptop" />
                      <span className="hide-mobile">Details</span>
                    </div>
                  </Col>
                </Row>
              </Nav>
            </CardHeader>
            <CardBody>
              <TabContent activeTab={activeTab}>
                <TabPane tabId={AccountTabs.TRANSACTIONS}>
                  <Fade>
                    <div>
                      <h1 className="show-mobile mt-3">Transactions</h1>
                      <div className="float-right">
                        Total transactions:{" "}
                        {transactionsData?.transactionsByAddress?.pagination
                          ?.total || 0}
                      </div>
                      <Table responsive className="min-w-880">
                        <thead>
                          <tr>
                            <th>TXID</th>
                            <th>Date</th>
                            <th>Sender</th>
                            <th>Recipient</th>
                            <th>Amount</th>
                            <th>Fee</th>
                            <th>Confirm.</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions?.map((tx: any) => {
                            return (
                              <TXElement
                                key={tx.id}
                                id={tx.id}
                                timestamp={tx.timestamp}
                                sender={tx.senderUsername || tx.senderId}
                                senderId={tx.senderId}
                                recipient={
                                  tx.recipientUsername || tx.recipientId
                                }
                                recipientId={tx.recipientId}
                                amount={
                                  tx.amount > 0 ? tx.amount : tx.voteAmount || 0
                                }
                                fee={tx.fee}
                                transferData={tx.data}
                                confirmations={blockHeight - +tx.height}
                                senderAffiliation={""}
                                recipientAffiliation={""}
                                type={tx.moduleAssetId}
                                addressContext={addressContextReact}
                                setAddressContextReact={setAddressContextReact}
                              />
                            );
                          })}
                        </tbody>
                      </Table>
                      {!transactions?.length ? (
                        <NoData balance={accountInfo.token?.balance || "0"} />
                      ) : null}
                      <Row>
                        <Col md={12}>
                          <Pagination
                            page={pagination}
                            totalPages={totalPages}
                            setPage={handlePagination}
                          />
                        </Col>
                      </Row>
                    </div>
                  </Fade>
                </TabPane>
                <TabPane tabId={AccountTabs.BLOCKS}>
                  <Fade>
                    <BlocksTab
                      isActive={activeTab === AccountTabs.BLOCKS}
                      address={accountInfo.address as string}
                    />
                  </Fade>
                </TabPane>
                <TabPane tabId={AccountTabs.DETAILS}>
                  <Fade>
                    <TabDelegate
                      username={accountInfo?.dpos?.delegate?.username || null}
                      pomHeights={
                        accountInfo?.dpos?.delegate?.pomHeights || null
                      }
                      consecutiveMissedBlocks={
                        accountInfo?.dpos?.delegate?.consecutiveMissedBlocks ||
                        null
                      }
                      lastForgedHeight={
                        accountInfo?.dpos?.delegate?.lastForgedHeight || null
                      }
                      isBanned={accountInfo?.dpos?.delegate?.isBanned || null}
                      totalVotesReceived={
                        accountInfo?.dpos?.delegate?.totalVotesReceived || null
                      }
                      selfVotesAmount={
                        accountInfo?.dpos?.delegate?.selfVotesAmount || null
                      }
                      rankAdjusted={
                        accountInfo?.dpos?.delegate?.rankAdjusted || null
                      }
                      isConsensusParticipant={
                        accountInfo?.dpos?.delegate?.isConsensusParticipant ||
                        null
                      }
                      minActiveHeight={
                        accountInfo?.dpos?.delegate?.minActiveHeight || null
                      }
                      nextForgingTime={
                        accountInfo?.dpos?.delegate?.nextForgingTime || null
                      }
                      producedBlocks={
                        accountInfo?.dpos?.delegate?.producedBlocks || null
                      }
                      sentVotes={accountInfo?.dpos?.sentVotes as SentVotes}
                      receivedVotes={
                        accountInfo?.dpos?.receivedVotes as ReceivedVotes
                      }
                      unlocking={
                        (accountInfo?.dpos?.unlocking as unknown) as Unlocking[]
                      }
                      nonce={accountInfo?.sequence?.nonce}
                      keys={accountInfo?.keys}
                      balance={accountInfo?.token as Token}
                      setAddressContextReact={setAddressContextReact}
                      address={accountInfo.address || ""}
                    />
                  </Fade>
                </TabPane>
              </TabContent>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </Col>

        <Col md="3" className={"d-none d-md-block"}>
          <CurrentAccountDetails
            address={accountInfo.address || ""}
            balance={accountInfo?.token?.balance || "0"}
            lockedBalance={accountInfo?.token?.locked || "0"}
            username={accountInfo?.username || ""}
            publicKey={accountInfo?.publicKey || "unknown"}
            multisig={accountInfo?.keys?.numberOfSignatures || "0"}
            votes={(accountInfo.dpos?.sentVotes as SentVotes[]) || []}
            totalVotesReceived={
              accountInfo.dpos?.delegate?.totalVotesReceived || "0"
            }
          />
          <div id="votes-sent">
            <AccountVotes
              votes={(accountInfo.dpos?.sentVotes as SentVotes[]) || []}
              setAddressContextReact={setAddressContextReact}
              kind={VOTE_KIND.SENT}
              account={accountData.account.address}
            />
          </div>
          <div id="votes-received">
            <AccountVotes
              votes={(accountInfo.dpos?.receivedVotes as ReceivedVotes[]) || []}
              setAddressContextReact={setAddressContextReact}
              kind={VOTE_KIND.RECEIVED}
              account={accountData.account.address}
            />
          </div>
        </Col>
      </Row>
      <Row className={"d-md-none"}>
        <Col xs={12}>
          <AccountVotes
            votes={(accountInfo.dpos?.sentVotes as SentVotes[]) || []}
            setAddressContextReact={setAddressContextReact}
            kind={VOTE_KIND.SENT}
            account={accountData.account.address}
          />

          <AccountVotes
            votes={(accountInfo.dpos?.receivedVotes as ReceivedVotes[]) || []}
            setAddressContextReact={setAddressContextReact}
            kind={VOTE_KIND.RECEIVED}
            account={accountData.account.address}
          />
        </Col>
      </Row>
    </>
  );
};
