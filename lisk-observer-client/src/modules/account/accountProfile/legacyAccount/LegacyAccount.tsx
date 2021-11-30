import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col,
  Table,
  CardTitle,
  Badge,
} from "reactstrap";
import { LegacyTXElement } from "./LegacyTXElement";
import { useHistory, useParams } from "react-router-dom";
import { LegacyAccountDetails } from "./LegacyAccountDetails";
import { NoData } from "../noTransactions/NoData";
import { Pagination } from "../../../../UI/pagination/Pagination";
import { Ghost } from "../../../../UI/ghost/Ghost";
import { IsErrorOrLoading } from "../../../utils/IsErrorOrLoading";
import { gql } from "graphql.macro";
import { useQuery } from "@apollo/react-hooks";
import { useLegacyAccountInfoQuery } from "../../../../generated/graphql";
import { AccountContainerParams } from "../AccountContainer";

const LEGACY_ACCOUNT_TRANSACTIONS = gql`
  query transactions($address: String!, $page: Int!) {
    transactionsByAddress(address: $address, page: $page) {
      ... on PaginatedTransactionLegacy {
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
          type
          timestamp
          senderId
          recipientId
          isLegacy
          amount
          fee
          data
          recipientId
          senderId
          asset
        }
      }
    }
  }
`;

export const LegacyAccount: React.FC = () => {
  let { addressContext: addressContextParam, page } = useParams<
    AccountContainerParams
  >();
  const [addressContextReact, setAddressContextReact] = useState<string>(
    addressContextParam || ""
  );
  const [pagination, setPagination] = useState(page ? +page : 1);
  const history = useHistory();

  const {
    data: accountTransactionsData,
    loading: accountTransactionsLoading,
    error: accountTransactionsError,
  } = useQuery(LEGACY_ACCOUNT_TRANSACTIONS, {
    variables: {
      address: addressContextReact,
      page: pagination,
    },
  });

  const {
    data: accountData,
    loading: accountDataLoading,
    error: accountDataError,
    refetch: accountDataRefetch,
  } = useLegacyAccountInfoQuery({
    variables: {
      address: addressContextReact,
    },
  });

  useEffect(() => {
    setPagination(page ? +page : 1);
    setAddressContextReact(addressContextReact);
    accountDataRefetch({
      address: addressContextReact,
    });
  }, [addressContextReact, accountDataRefetch, page]);

  const handlePagination = (newPage: number) => {
    setPagination(newPage);
    history.push(`/account/${addressContextReact}/${newPage}`);
  };

  if (
    accountTransactionsLoading ||
    accountDataLoading ||
    accountTransactionsError ||
    accountDataError
  ) {
    return (
      <div className="content">
        <IsErrorOrLoading
          error={!!accountTransactionsError || !!accountDataError}
          title={"transactions"}
        />
        ;
      </div>
    );
  }

  if (!accountData?.accountLegacy?.address) {
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

  const transactions = accountTransactionsData?.transactionsByAddress?.data;
  const accountInfo = accountData.accountLegacy;
  const totalDocs =
    accountTransactionsData?.transactionsByAddress?.pagination?.total || 0;
  const totalPages = Math.ceil(totalDocs / 25);

  if (pagination > totalPages) {
    setPagination(0);
  }

  return (
    <>
      <div className="content">
        <Row className={"d-block d-sm-none"}>
          <Col md="3">
            <LegacyAccountDetails
              address={accountInfo?.address || ""}
              balance={accountInfo?.balance || "0"}
              username={accountInfo?.username || ""}
              publicKey={accountInfo?.publicKey || "unknown"}
            />
          </Col>
        </Row>
        <Row>
          <Col md="9">
            <Card>
              <CardHeader>
                <h5 className="title">Transactions</h5>
              </CardHeader>
              <CardBody></CardBody>
              <CardFooter>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>TXID</th>
                      <th>Date</th>
                      <th>Sender</th>
                      <th>Recipient</th>
                      <th>Amount</th>
                      <th>Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions?.map((tx: any) => {
                      return (
                        <LegacyTXElement
                          key={tx.id}
                          id={tx.id}
                          timestamp={tx.timestamp}
                          senderId={tx.senderId}
                          senderUsername={tx.senderUsername}
                          recipientId={tx.recipientId}
                          recipientUsername={tx.recipientUsername}
                          amount={tx.amount}
                          fee={tx.fee}
                          transferData={tx.data}
                          type={tx.type}
                          addressContext={addressContextReact}
                          setAddressContextReact={setAddressContextReact}
                        />
                      );
                    })}
                  </tbody>
                </Table>
                {!transactions?.length ? (
                  <NoData balance={accountInfo.balance || "0"} />
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
              </CardFooter>
            </Card>
          </Col>
          <Col md="3" className={"d-none d-md-block"}>
            <LegacyAccountDetails
              address={accountInfo.address || ""}
              balance={accountInfo?.balance || "0"}
              username={accountInfo?.username || ""}
              publicKey={accountInfo?.publicKey || "unknown"}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};
