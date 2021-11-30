import React from "react";
import "./style.css";
import { Col, Row, Table } from "reactstrap";
import { DatailCard } from "./DetailCard";
import { TransactionsRow } from "../transactions/TransactionRow";
import { beddowsToDecimal } from "../utils/lisk/utils/lisk/beddowsToDecimal";
import { Ghost } from "../../UI/ghost/Ghost";
import moment from "moment";
import { CardData } from "./CardData";
import { CardUsername } from "./CardUsername";
import { IDData } from "./IDData";
import { Copy } from "../../UI/copy/Copy";

interface Props {
  transactions: any;
  block: any;
}

export const CurrentBlockDetail: React.FC<Props> = ({
  transactions,
  block,
}: Props) => {
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
            <CardData
              text={!!+block.isFinal ? "✔️ Finalized" : "╳  Not finalized"}
            />
          </DatailCard>
        </Col>
        <Col>
          <DatailCard title="Transactions">
            <CardData text={transactions.length} />
          </DatailCard>
        </Col>
        <Col>
          <DatailCard title="Rewards">
            <CardData text={`${beddowsToDecimal(block.reward)} Ⱡ`} />
          </DatailCard>
        </Col>
      </Row>

      <Row>
        <Col sm="12" md="6">
          <DatailCard title="Delegate">
            <CardUsername username={block.username} address={block.address} />{" "}
          </DatailCard>
        </Col>
        <Col sm="12" md="6">
          <DatailCard title="Forged at">
            <CardData
              text={
                moment(+block.timestamp * 1000).format(
                  "dddd D/MM/YYYY - HH:mm:ss ZZ"
                ) +
                " - " +
                moment(+block.timestamp * 1000).fromNow()
              }
            />
          </DatailCard>
        </Col>
      </Row>

      {transactions.length ? (
        <DatailCard title="Transactions">
          <Table className="tablesorter" responsive>
            <thead className="text-primary">
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>From</th>
                <th>To</th>
                <th className="text-center">Amount</th>
                <th className="text-center">Fee</th>
              </tr>
            </thead>
            <tbody>
              <TransactionsRow transactions={transactions} />
            </tbody>
          </Table>
        </DatailCard>
      ) : (
        <DatailCard title="Transactions">
          <Ghost message={"No transactions found in this block"} />
        </DatailCard>
      )}
    </div>
  );
};
