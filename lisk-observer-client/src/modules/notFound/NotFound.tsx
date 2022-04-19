import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { useScrollToTop } from "../utils/hooks";
import "./style.css";

const NotFoundPage = () => {
  useScrollToTop();
  return (
    <div className="super-fast-fade-in">
      <Card>
        <CardBody className="loader-container waves-bg not-found-container">
          <div className="not-found-title">404</div>
          <p className="not-found-text mb-5">
            Ooooops <br /> This page is not available
          </p>
          <Link to={"/"} className="pb-5">
            <Button className="btn-round">Back to home</Button>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
};

export default NotFoundPage;
