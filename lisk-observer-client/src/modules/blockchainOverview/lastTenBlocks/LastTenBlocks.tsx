import React, { useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import moment from "moment";
import { BlockElement } from "./BlockElement";
import { IsErrorOrLoading } from "../../utils/IsErrorOrLoading";
import { Link } from "react-router-dom";
import { useInterval } from "../../customHooks/useInterval";
import { useLastTenBlocksQuery } from "../../../generated/graphql";
moment.relativeTimeThreshold("s", 59);
moment.relativeTimeThreshold("ss", 0);

export const LastTenBlocksTable: React.FC = () => {
  const { data, loading, error } = useLastTenBlocksQuery({
    pollInterval: 5000,
  });
  const [timestamps, setTimestamps] = useState<{
    [key: string]: { when: number; text: string };
  }>({});
  const timestampsLocal: { [key: string]: { when: number; text: string } } = {};

  const [fade, setFade] = useState<boolean>(true);
  const [firstId, setFirstId] = useState<string>("");

  useInterval(() => {
    Object.keys(timestampsLocal).forEach((key) => {
      timestampsLocal[key] = {
        when: timestampsLocal[key].when,
        text: moment(timestampsLocal[key].when * 1000).fromNow(),
      };
    });
    setTimestamps(timestampsLocal);
  }, 1000);

  if (error || loading) {
    return (
      <div>
        <IsErrorOrLoading error={!!error} title={"blocks"} />
      </div>
    );
  }

  if (
    data?.lastBlocks?.data &&
    data?.lastBlocks?.data[0] &&
    data?.lastBlocks?.data[0].id !== firstId
  ) {
    setFade(true);
    setFirstId(data.lastBlocks.data[0].id);
    setTimeout(() => setFade(false), 4000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Last Blocks</CardTitle>
      </CardHeader>
      <CardBody>
        <Row className="last-ten-list-container">
          <Col md={12}>
            {data?.lastBlocks?.data?.map((block: any, index: number) => {
              timestampsLocal[block.id] = {
                when: block.timestamp,
                text: moment(block.timestamp * 1000).fromNow(),
              };
              return (
                <BlockElement
                  fade={fade}
                  index={index}
                  key={index}
                  id={block.id}
                  generatorUsername={block?.username || "unavailable"}
                  generatorAddress={block?.address || "unavailable"}
                  height={block.height}
                  howMuch={block.reward}
                  txCount={block.numberOfTransactions || "-1"}
                  when={
                    timestamps[block.id]
                      ? timestamps[block.id].text
                      : timestampsLocal[block.id].text
                  }
                />
              );
            })}
          </Col>
        </Row>
        <div className={"text-center"}>
          <Link to={"/blocks"} className={"btn-fill btn btn-secondary"}>
            See more blocks
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};
