import React, { useState, useEffect } from "react";
import "./style.css";
import MapChart from "./WorldAtlas";
import ReactTooltip from "react-tooltip";
import { Col, Row, Table } from "reactstrap";
import { StatsCard } from "../analytics/StatsCard";
import { useScrollToTop } from "../utils/hooks";
import { IsErrorOrLoading } from "../utils/IsErrorOrLoading";
import { useNetworkInfoQuery } from "../../generated/graphql";

const OFFSET = 127397;
const CC_REGEX = /^[a-z]{2}$/i;

const NetworkOverview = () => {
  useScrollToTop();
  // Missing in this Typescript version
  // @ts-ignore
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  const [peers, setPeers] = useState([]);
  const [content, setContent] = useState("");
  const { data, loading, error } = useNetworkInfoQuery();

  const getEmojiFlag = (countryISO: any) => {
    if (!CC_REGEX.test(countryISO)) {
      const type = typeof countryISO;
      // throw new TypeError(
      //   `countryISO argument must be an ISO 3166-1 alpha-2 string, but got '${
      //     type === "string" ? countryISO : type
      //   }' instead.`
      // );
      return "🏳";
    }
    const codePoints = [...countryISO.toUpperCase()].map(
      (c) => c.codePointAt() + OFFSET
    );
    return String.fromCodePoint(...codePoints);
  };

  useEffect(() => {
    const filteredPeers: any = data?.networkInfo?.peers
      ?.filter((peer) => peer?.country !== "ZZ")
      .sort((a, b) => {
        if (a?.height === "unknown") {
          return 1;
        }
        if (b?.height === "unknown") {
          return -1;
        }
        return +b?.height! - +a?.height! > 0 ? 1 : -1;
      });
    setPeers(filteredPeers || []);
  }, [data, setPeers]);

  if (loading || error) {
    return (
      <div className="content">
        <IsErrorOrLoading error={!!error} title={"Network overview"} />
      </div>
    );
  }

  return (
    <div className="content">
      <h4>
        Network -{" "}
        <span className="opacity-50 font-light">Updated every 30 minutes</span>
      </h4>
      <Row>
        <Col md="12">
          <MapChart setTooltipContent={setContent} networkInfo={data} />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs={12} md={6}>
          <Row>
            <Col xs={12} md={12} xl={6}>
              <StatsCard
                title={"Network version"}
                value={data?.networkInfo?.stats?.networkVersionDominant}
                icon={"server"}
                tooltip={data?.networkInfo?.stats?.networkVersion
                  ?.map(
                    (version) =>
                      `Version ${version?.version} - ${version?.peers} Peers <br/>`
                  )
                  .join("")}
              />
            </Col>
            <Col xs={12} md={12} xl={6}>
              <StatsCard
                title={"Total Peers"}
                value={`${
                  data?.networkInfo?.stats?.totalPeers?.toLocaleString() || 0
                }`}
                icon={"users"}
              />
            </Col>
            <Col xs={12} md={12} xl={6}>
              <StatsCard
                title={"Connected To Peers"}
                value={`${
                  data?.networkInfo?.stats?.connectedPeers?.toLocaleString() ||
                  0
                }`}
                icon={"user-check"}
              />{" "}
            </Col>
            <Col xs={12} md={12} xl={6}>
              <StatsCard
                title={"Other Peers"}
                value={
                  data?.networkInfo?.stats?.disconnectedPeers?.toLocaleString() ||
                  0
                }
                icon={"user-slash"}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={6}>
          <div className="networkPeersContainer">
            <Table className="tablesorter " responsive>
              <thead className="text-primary">
                <tr className="stickyTh">
                  <th>IP</th>
                  <th>Country</th>
                  <th>Height</th>
                  <th>Version</th>
                </tr>
              </thead>
              <tbody>
                {peers?.map((peer: any) => (
                  <tr>
                    <td>
                      <p className="font-m">{peer.peerId}</p>
                    </td>
                    <td>
                      <p className="font-m">
                        {getEmojiFlag(peer.country)}{" "}
                        {regionNames.of(peer.country)}
                      </p>
                    </td>
                    <td>
                      <p className="font-m">
                        {peer.height !== "unknown"
                          ? peer.height
                          : "Not defined"}
                      </p>
                    </td>
                    <td>
                      <p className="font-m">
                        {peer["networkVersion"] !== "unknown"
                          ? peer["networkVersion"]
                          : "Not defined"}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
      <ReactTooltip multiline>{content}</ReactTooltip>
    </div>
  );
};

export default NetworkOverview;
