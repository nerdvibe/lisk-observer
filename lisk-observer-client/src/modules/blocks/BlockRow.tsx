import React from "react";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

interface Props {
  blocks: any[];
}

export const BlockRow: React.FC<Props> = ({ blocks }) => {
  return (
    <Row>
      {blocks.map((block: any) => {
        return (
          <Col
            className="font-icon-list col-xs-6 col-xs-6"
            lg="4"
            md="4"
            sm="4"
            xl="3"
            key={block.height}
          >
            <Link to={`/block/${block.id}`}>
              <div className="block-card">
                <div className="block-card-background" />
                <div className="block-card-container">
                  <div className="block-card-data">
                    <div>
                      <p className="block-card-header-text">Height</p>
                      <p className="block-card-value-text">{block.height}</p>
                      <p className="block-card-header-text">Forger</p>
                      <p className="block-card-value-text">{block.username}</p>
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
