import React from "react";
import { NoData } from "../../modules/account/accountProfile/noTransactions/NoData";
import "./style.css";

export const CookieBanner = () => {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 999999,
        bottom: "10em",
        right: "2em",
        display: "flex",
      }}
    >
      <div
        className="thought"
        style={{
          right: "12px",
          bottom: "25px",
        }}
      >
        <div
          className="col12"
          style={{
            padding: "15px",
          }}
        >
          <div className="row">
            <p
              style={{
                color: "black",
                textAlign: "left",
              }}
            >
              Hey there! I just wanted to let you know that Lisk Observer uses
              only essential functional cookies to work :)
            </p>
          </div>
          <div
            className="row"
            style={{
              marginTssop: "15px",
            }}
          >
            <a href="#">Sure!</a>
          </div>
        </div>
      </div>
      <div
        style={{
          alignSelf: "flex-end",
          marginBottom: "-67px",
        }}
      >
        <NoData message={"."} />
      </div>
    </div>
  );
};
