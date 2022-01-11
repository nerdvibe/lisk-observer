import React, { useMemo, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  Table,
  Spinner,
} from "reactstrap";
import { IsErrorOrLoading } from "../utils/IsErrorOrLoading";
import { LastMessageElement } from "./LastMessageElement";
import { isBad, sanitizeString } from "../utils/strings/censor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";
import "./style.css";
import { useScrollToTop } from "../utils/hooks";
import { useEternityWallQuery } from "../../generated/graphql";

const PAYOUT_FILTER_KEYWORDS = [
  "thank",
  "elite",
  "rooney",
  "delegate",
  "support",
];

const sanitize = (tx: any, filterPayouts: boolean) => {
  const sanitized = { ...tx };
  if (isBad(sanitized.transferData)) {
    return null;
  }

  if (
    filterPayouts &&
    PAYOUT_FILTER_KEYWORDS.filter((el) =>
      sanitized?.transferData?.toLowerCase().includes(el)
    ).length
  ) {
    return null;
  }

  // filter exchange message IDs
  if (
    filterPayouts &&
    /[a-z,0-9]{8}-[a-z,0-9]{4}-[a-z,0-9]{4}-[a-z,0-9]{4}-[a-z,0-9]{12}/.test(
      sanitized.transferData
    )
  ) {
    return null;
  }

  // sanitized.transferData = filter(sanitized.transferData);
  sanitized.transferData = sanitizeString(sanitized.transferData);

  return sanitized;
};

const LastMessages: React.FC = () => {
  const [page] = useState(0);
  const [disableFiltersLabel, setDisableFiltersLabel] = useState("Load more");
  const [loadingLabel, setLoadingLabel] = useState("Loading");
  const [filterPayouts, setFilterPayouts] = useState(false);
  const {
    data: lastMessages,
    loading: lastMessagesLoading,
    error: lastMessagesError,
    fetchMore: lastMessagesFetchMore,
  } = useEternityWallQuery({
    variables: {
      page,
    },
  });
  const [isLoading, setIsLoading] = useState(lastMessagesLoading);
  useScrollToTop();

  const messageSanitize = () => {
    if (lastMessages?.eternityWall?.data) {
      setIsLoading(false);
      return [...lastMessages.eternityWall.data]
        .map((tx: any) => sanitize(tx, filterPayouts))
        .filter((tx) => tx !== null);
    }
  };

  const messages = useMemo(messageSanitize, [
    lastMessages?.eternityWall?.data,
    filterPayouts,
    lastMessages,
  ]);

  if (
    ((!lastMessages ||
      !lastMessages?.eternityWall?.data ||
      !lastMessages?.eternityWall?.data.length) &&
      lastMessagesLoading) ||
    lastMessagesError
  ) {
    return (
      <div className="content">
        <IsErrorOrLoading error={!!lastMessagesError} title={"Eternity wall"} />
      </div>
    );
  }

  const onLoadMore = (depth = 0, depthData: any = []) => {
    setIsLoading(true);
    const actualOffset = !!depthData?.length
      ? depthData.length
      : lastMessages?.eternityWall?.data?.length;

    lastMessagesFetchMore({
      variables: {
        page: actualOffset,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }

        const newData = [
          ...(!!depthData.length
            ? [...depthData]
            : (prev as any).eternityWall?.data),
          ...(fetchMoreResult as any).eternityWall?.data,
        ];

        if (
          filterPayouts &&
          newData
            .map((tx: any) => sanitize(tx, filterPayouts))
            .filter((tx) => tx !== null).length === messages!.length &&
          depth <= 5
        ) {
          // @ts-ignore
          setLoadingLabel(
            `Fetching more, because the results where payouts... (Attempt ${
              depth + 1
            } of 6)`
          );
          return onLoadMore(depth + 1, newData);
        }

        setLoadingLabel("Loading");
        if (depth >= 5) {
          setDisableFiltersLabel(
            "Refetched 6 more times, but the results where all payouts. Try again?"
          );
        } else {
          setDisableFiltersLabel("Load more");
        }

        setIsLoading(false);

        return Object.assign({}, prev, {
          eternityWall: {
            data: newData,
          },
        });
      },
    });
  };

  const onFilterPayouts = () => {
    setFilterPayouts(!filterPayouts);
  };

  return (
    <div className="content">
      <div className="react-notification-alert-container"></div>
      <Row>
        <Col md={12}>
          <Card className="">
            <CardHeader>
              <Row>
                <Col>
                  <CardTitle className={"d-inline"}>
                    <h4 className={""}> Lisk Eternity Wall </h4>
                    <p className="category">
                      Read through the Lisk transactions - This is an
                      experimental feature.
                    </p>
                  </CardTitle>
                </Col>
                <Col>
                  <div
                    className="payout-button "
                    data-tip={
                      filterPayouts
                        ? "Disable payout/exchange IDs filters"
                        : "Enable payout/exchange IDs filters"
                    }
                  >
                    <FontAwesomeIcon
                      id="PayoutFilterTooltip"
                      onClick={onFilterPayouts}
                      title={
                        filterPayouts
                          ? "Disable payout/exchange IDs filters"
                          : "Enable payout/exchange IDs filters"
                      }
                      icon={filterPayouts ? "eye-slash" : "eye"}
                      className="font-xl"
                    />
                  </div>
                  <ReactTooltip />
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <div className="table-full-width table-responsive">
                <Table>
                  <tbody>
                    {messages!.map((message: any) => {
                      return (
                        <LastMessageElement
                          key={message.id}
                          id={message.id}
                          transferData={message.data}
                          amount={message.amount}
                          timestamp={message.timestamp}
                          sender={message.senderUsername || message.senderId}
                          senderId={message.senderId}
                        />
                      );
                    })}
                  </tbody>
                </Table>
              </div>
              <Button
                block
                color="primary"
                onClick={() => onLoadMore()}
                className={isLoading ? "disabled" : ""}
              >
                {isLoading ? (
                  <>
                    <Spinner /> {loadingLabel}
                  </>
                ) : (
                  disableFiltersLabel
                )}
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LastMessages;
