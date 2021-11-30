import React from "react";
import "./style.css";
import { Col, Row } from "reactstrap";
import { DatailCard } from "./DetailCard";
import { beddowsToDecimal } from "../utils/lisk/utils/lisk/beddowsToDecimal";
import { Ghost } from "../../UI/ghost/Ghost";
import moment from "moment";
import { CardData } from "./CardData";
import { CardUsername } from "./CardUsername";
import { IDData } from "./IDData";
import { Copy } from "../../UI/copy/Copy";
import { fromLiskEpoch } from "../utils/lisk/utils/lisk/time";

interface Props {
  block: any;
}

export const LegacyBlockDetail: React.FC<Props> = ({ block }: Props) => {
  const timestamp = fromLiskEpoch(+block.timestamp);
  return (
    <div className="content">
      <Row>
        <Col sm="12" md="10" lg="8">
          <DatailCard
            title="Block hash"
            icon={<Copy className="float-right" text={block.id} />}
          >
            <IDData text={block.id} />
          </DatailCard>
        </Col>
        <Col>
          <DatailCard title="Height">
            <CardData text={block.height} icon={"icon-puzzle-10"} />
          </DatailCard>
        </Col>
      </Row>
      <Row>
        <Col>
          <DatailCard title="Previous block">
            <CardData
              text={
                block.height === 0 ? "none" : (+block.height - 1).toString()
              }
            />
          </DatailCard>
        </Col>
        <Col>
          <DatailCard title="Block Finality">
            <CardData text="✔️ Finalized" />
          </DatailCard>
        </Col>
        <Col>
          <DatailCard title="Transactions">
            <CardData text={block.numberOfTransactions} />
          </DatailCard>
        </Col>
        <Col>
          <DatailCard title="Rewards">
            <CardData text={`${beddowsToDecimal(+block.reward)} Ⱡ`} />
          </DatailCard>
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="6">
          <DatailCard title="Delegate">
            <CardUsername
              username={block.username || block.generatorPublicKey}
              address={block.address || block.generatorPublicKey}
            />{" "}
          </DatailCard>
        </Col>
        <Col sm="12" md="6">
          <DatailCard title="Forged at">
            <CardData
              text={
                moment(+timestamp).format("dddd D/MM/YYYY - HH:mm:ss ZZ") +
                " - " +
                moment(+timestamp).fromNow()
              }
            />
          </DatailCard>
        </Col>
      </Row>
      <DatailCard title="Transactions">
        <Ghost message={"Transactions not available for legacy blocks"} />
      </DatailCard>
    </div>
  );
};
