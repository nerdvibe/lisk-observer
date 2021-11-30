import React, { useEffect, useState } from "react";
import { Badge, Col, Row, Table } from "reactstrap";
import { Pagination } from "../../../../../UI/pagination/Pagination";
import { useBlocksByAddressLazyQuery } from "../../../../../generated/graphql";
import { NoData } from "../../noTransactions/NoData";
import { IsErrorOrLoading } from "../../../../utils/IsErrorOrLoading";
import { truncateMidString } from "../../../../utils/strings/strings";
import moment from "moment";
import { beddowsToDecimal } from "../../../../utils/lisk/utils/lisk/beddowsToDecimal";
import { Link } from "react-router-dom";

interface Props {
  address: string;
  isActive: boolean;
}

const TABLE_OFFSET = 50;

export const BlocksTab: React.FC<Props> = ({ isActive, address }) => {
  const [page, setPage] = useState(1);
  const [getBlocks, { loading, data, error }] = useBlocksByAddressLazyQuery({
    variables: {
      address,
      page,
    },
  });

  useEffect(() => {
    if (isActive && !data && !loading) {
      getBlocks();
    }
  }, [isActive, data, getBlocks, loading]);

  if (loading || error) {
    return <IsErrorOrLoading error={!!error} title={"Blocks"} />;
  }
  if (!data?.blocksByAddress?.data?.length) {
    return <NoData message={"No blocks found for this account"} />;
  }

  const totalDocs = data?.blocksByAddress?.pagination?.total!;
  const totalPages = Math.ceil(totalDocs / TABLE_OFFSET);

  return (
    <>
      <h1 className="show-mobile mt-3">Blocks</h1>
      <div>
        <div className={"float-right"}>Total blocks: {totalDocs}</div>
        <Table responsive>
          <thead>
            <tr>
              <th>Block ID</th>
              <th>Height</th>
              <th>Timestamp</th>
              <th>Rewards</th>
              <th>Finalized</th>
            </tr>
          </thead>
          <tbody>
            {data?.blocksByAddress?.data?.map((block) => {
              return (
                <tr>
                  <td>
                    <i className="app-icons icon-app font-xxl mr-2" />
                    <Link to={`/block/${block?.id}`}>
                      {truncateMidString(block?.id, 10)}
                    </Link>
                  </td>
                  <td>{block?.height}</td>
                  <td>
                    {moment(+block?.timestamp! * 1000).format(
                      "D/MM/YYYY - HH:mm:ss"
                    )}
                  </td>
                  <td>
                    <Badge className={"badge-dark fs-medium"}>
                      {(+beddowsToDecimal(block?.reward!).toFixed(
                        2
                      )).toLocaleString()}{" "}
                      Ⱡ
                    </Badge>{" "}
                  </td>
                  <td>{block?.isFinal ? "✅" : "⏳"}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Row>
          <Col md={12}>
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </Col>
        </Row>
      </div>
    </>
  );
};
