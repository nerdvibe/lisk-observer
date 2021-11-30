import React from "react";
import { ReactComponent as AstronautSVG } from "./assets/astronaut.svg";
import { ReactComponent as PlanetSVG } from "./assets/planet.svg";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { Stars } from "../../UI/Stars";
import "./style.css";

interface Props {
  title: string;
}

export const ComingSoon: React.FC<Props> = ({ title }) => {
  return (
    <div className="content">
      <Stars />
      <Card className="card-chart">
        <Stars />
        <CardHeader>
          <CardTitle tag="h4">{title}</CardTitle>
          <CardBody className="text-center pb-0">
            <h2>
              We are building this page{" "}
              <span role="img" aria-label="stars emoji">
                ✨
              </span>
            </h2>
            <div className="space-scene">
              <div className="astronaut">
                <AstronautSVG />
              </div>
              <div className="planet-wrapper">
                <PlanetSVG />
              </div>
            </div>
          </CardBody>
        </CardHeader>
      </Card>
    </div>
  );
};
