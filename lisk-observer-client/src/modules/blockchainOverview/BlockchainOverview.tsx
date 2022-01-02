import React from "react";
import { Row, Col } from "reactstrap";
import { SearchCard } from "../../UI/components/SearchCard";
import { HeaderCard } from "../../UI/components/HeaderCard";
import { BlockHeightCard } from "./blockHeightCard/BlockHeightCard";
import { TotalSupplyCard } from "./totalSupplyCard/TotalSupplyCard";
import { TxLastDayCard } from "./txLastDayCard/TxLastDayCard";
import { LastTenTransactionsTable } from "./lastTenTransactionsTable/LastTenTransactionsTable";
import { LastTenBlocksTable } from "./lastTenBlocks/LastTenBlocks";
import { BlockHeightFinalizedCard } from "./blockHeightCard/BlockHeightFinalizedCard";
import { useScrollToTop } from "../utils/hooks";
import "./style.css";

export const BlockchainOverview: React.FC = () => {
  useScrollToTop();
  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <HeaderCard />
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <SearchCard />
          </Col>
        </Row>
        <Row>
          <Col lg="3">
            <BlockHeightCard />
          </Col>
          <Col lg="3">
            <BlockHeightFinalizedCard />
          </Col>
          <Col lg="3">
            <TotalSupplyCard />
          </Col>
          <Col lg="3">
            <TxLastDayCard />
          </Col>
        </Row>
        <Row>
          <Col lg="6" md="12">
            <LastTenTransactionsTable />
          </Col>
          <Col lg="6" md="12">
            <LastTenBlocksTable />
          </Col>
        </Row>
      </div>
    </>
  );
};
