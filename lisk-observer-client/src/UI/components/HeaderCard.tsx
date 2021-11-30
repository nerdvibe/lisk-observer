import React from "react";
import {
  Card,
  CardImgOverlay,
  CardTitle,
  CardText,
  CardImg,
  Col,
  Row,
} from "reactstrap";
import bg from "../assets/galaxy_big.jpg";
import { Chart } from "./chartBanner/Chart";
import "./style.css";
import TelescopeAnimation from "../assets/telescope.svg";

export const HeaderCard = () => {
  const centerStyleMobile = {
    transition: "0.5s",
    width: "100%",
    marginBottom: "0px",
    fontSize: "12px",
  };

  let mobile = window.screen.width <= 440 ? true : false;

  return !mobile ? (
    <>
      <Card className="bg-dark text-white header-card">
        <CardImgOverlay>
          <Row className="full-height banner-container">
            <Col
              sm={4}
              lg={4}
              xl={3}
              className="col-12 presentation-background"
            >
              <div className="presentation-content">
                <object
                  className="note-icon"
                  data={TelescopeAnimation}
                  type="image/svg+xml"
                  aria-label="telescope icon"
                />
                <h3>Lisk Observer</h3>
                <p className="presentation-text">
                  Lisk Observer is a Lisk Blockchain explorer. The Lisk
                  ecosystem is a galaxy of interconnected sidechains, like
                  little planets communicating between each other. <br />
                </p>
              </div>
            </Col>
            <Col sm={8} xl={9} className="chart-background">
              <Chart />
            </Col>
          </Row>
        </CardImgOverlay>
      </Card>
    </>
  ) : (
    <>
      <Card className="bg-dark text-white">
        <CardImg src={bg} alt="..." />
        <CardImgOverlay className="card-overlay">
          <CardTitle className={"text-center"} style={centerStyleMobile}>
            Lisk Observer{" "}
          </CardTitle>
          <CardText className={"text-center"} style={centerStyleMobile}>
            Lisk Observer is a Lisk Blockchain explorer. The Lisk ecosystem is a
            galaxy of interconnected sidechains,
          </CardText>
        </CardImgOverlay>
      </Card>
    </>
  );
};
