import React, { useMemo, useState } from "react";
import { Badge, Col, Row, Collapse } from "reactstrap";
import moment from "moment";
import { ReactComponent as Logo } from "./icons/minedBlock.svg";
import { Link } from "react-router-dom";
import { beddowsToDecimal } from "../../utils/lisk/utils/lisk/beddowsToDecimal";
moment.relativeTimeThreshold("ss", 0);

interface Props {
  fade: boolean;
  index: number;
  key: number;
  id: string;
  generatorUsername: string;
  generatorAddress: string;
  when: string;
  height: string;
  howMuch: string;
  txCount: string;
}

export const BlockElement: React.FC<Props> = ({
  id,
  generatorUsername,
  generatorAddress,
  when,
  height,
  howMuch,
  txCount,
  fade,
  index,
}) => {
  const shouldFade = index === 0 && fade;

  const [isOpen, setIsOpen] = useState(false);

  let mobile = window.innerWidth <= 440 ? true : false;

  const toggle = () => setIsOpen(!isOpen);

  return useMemo(() => {
    return !mobile ? (
      <Row className={`last-ten-row ${shouldFade ? "fade-in" : ""}`}>
        <Col xs={1} sm={1} md={1}>
          <Row>
            <Col md={12} className="pl-0">
              <Logo fill="white" width={40} height={40} />
            </Col>
          </Row>
        </Col>
        <Col xs={4} sm={4} md={4}>
          <Row>
            <Col md={12}>
              <Link to={`/block/${id}`}>{height}</Link>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <p>{when}</p>
            </Col>
          </Row>
        </Col>
        <Col xs={3} sm={3} md={3}>
          <Row>
            <Col md={12}>
              <p>generated by</p>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Link to={`/account/${generatorAddress}`}>
                {generatorUsername}
              </Link>
            </Col>
          </Row>
        </Col>
        <Col xs={4} sm={4} md={4} className={"text-right"}>
          <Row>
            <Col md={12}>
              <Badge className={"badge-dark fs-medium"}>
                {+beddowsToDecimal(howMuch).toLocaleString()} Ⱡ
              </Badge>
            </Col>
          </Row>
          <Row>
            {/*TODO FIX THIS*/}
            {/*<Col md={12}>from {txCount} txns</Col>*/}
          </Row>
        </Col>
      </Row>
    ) : (
      <div>
        <Row
          className={`last-ten-row ${shouldFade ? "fade-in" : ""}`}
          onClick={toggle}
        >
          <Col xs={1} md={1}>
            <Row>
              <Col md={12} className="pl-0">
                <Logo fill="white" width={40} height={40} />
              </Col>
            </Row>
          </Col>
          <Col xs={2}></Col>
          <Col xs={8} md={3} className={"text-right"}>
            <Row>
              <Col md={12}>
                <p>generated by</p>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Link to={`/account/${generatorAddress}`}>
                  {generatorUsername}
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
        <Collapse isOpen={isOpen}>
          <Row>
            <Col xs={6} md={4}>
              <Row>
                <Col md={12}>
                  <p>{height}</p>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <p>{when}</p>
                </Col>
              </Row>
            </Col>
            <Col xs={5} md={4} className={"text-right"}>
              <Row>
                <Col md={12}>
                  <Badge className={"badge-dark fs-medium"}>
                    {+beddowsToDecimal(howMuch).toLocaleString()} Ⱡ
                  </Badge>
                </Col>
              </Row>
              <Row>
                {/*TODO FIX THIS*/}
                {/*<Col md={12}>from {txCount} txns</Col>*/}
              </Row>
            </Col>
          </Row>
        </Collapse>
      </div>
    );
  }, [when]);
};
