import React from "react";
import moment from "moment";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { DelegateLogo } from "../utils/logos/DelegateLogo";
import { ReactComponent as CubeIcon } from "./icons/cube.svg";

interface Props {
  blocks: any[];
}

export const BlockRow: React.FC<Props> = ({ blocks }) => {
  return (
    <Row>
      {blocks.map((block: any) => {
        return (
          <Col
            className="font-icon-list col-xs-6 col-xs-6 mt-5"
            lg="4"
            md="4"
            sm="4"
            xl="3"
            key={block.height}
          >
            <Link to={`/block/${block.id}`}>
              <div className="block-card">
                <div className="block-card-container pb-4">
                  <div className="block-card-data">
                    <div className="block-icon-container">
                      <CubeIcon />
                    </div>
                    <div className="w-75 mt-5">
                      <p className="block-card-header-text">Height</p>
                      <p className="block-card-value-text">{block.height}</p>
                      <p className="block-card-header-text">Forger</p>
                      <DelegateLogo
                        className="block-delegate-icon"
                        delegateName={block.username}
                        address={block.address}
                      />
                      <p className="block-card-value-text inline-block">
                        {block.username}
                      </p>
                      <p className="block-time text-right">
                        <small>
                          {moment(+block.timestamp * 1000).fromNow()}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </Col>
        );
      })}
    </Row>
  );
};
