import React from "react";
import "./style.css";
import { Row } from "reactstrap";

interface Props {
  balance?: string;
  message?: string;
}

export const NoData: React.FC<Props> = ({ balance, message }) => {
  const label = message
    ? message
    : !!balance
    ? "This account has no transactions in the 3.0, a link between < 3.0 and > 3.0 TXs will be available soon..."
    : "No transactions found for this account";
  return (
    <>
      <Row className="m-4">
        <div className="ship">
          <div className="body">
            <div className="eyes">
              <span className="eye_1"></span>
              <span className="eye_2"></span>
            </div>
            <svg
              className="vawes"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 50 50"
            >
              <defs>
                <circle id="wave" cx="25" cy="25" r="24" />
              </defs>
              <use xlinkHref="#wave" className="wave_1" />
              <use xlinkHref="#wave" className="wave_2" />
            </svg>
          </div>
          <div className="foot_1"></div>
          <div className="foot_2"></div>
          <div className="foot_3"></div>
        </div>
      </Row>
      <Row className={"text-center top45"}>
        <h4 className="w-100">{label}</h4>
      </Row>
    </>
  );
};
