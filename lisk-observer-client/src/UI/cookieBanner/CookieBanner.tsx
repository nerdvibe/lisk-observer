import React, { useState } from "react";
import { NoData } from "../../modules/account/accountProfile/noTransactions/NoData";
import "./style.css";

export const CookieBanner = () => {
  const [className, setClassName] = useState("");
  const [mainTextClass, setMainTextClass] = useState("");
  const [acceptedCookies] = useState(
    !!localStorage.getItem("COOKIES_ACCEPTED") || false
  );
  const [showAltMessage, setShowAltMessage] = useState(false);
  const acceptCookies = () => {
    localStorage.setItem("COOKIES_ACCEPTED", `${new Date()}`);
    setMainTextClass("fade-out");
    setTimeout(() => {
      setShowAltMessage(true);
    }, 300);
    setTimeout(() => {
      setClassName("fade-out");
    }, 2500);
  };

  return !acceptedCookies ? (
    <div className={`cookie-banner-container ${className}`}>
      <div className="thought">
        <div className="px-4 py-2">
          {!showAltMessage ? (
            <div className={mainTextClass}>
              <div>
                <p className="text-black">
                  Hey there! I just wanted to let you know that Lisk Observer
                  uses only essential functional cookies to work :)
                </p>
              </div>
              <div className="mt-3 purple-text" onClick={acceptCookies}>
                Sure!
              </div>
            </div>
          ) : (
            <div className="alt-message">
              <p className="text-black w-100 ">
                Thank you!
                <br />
                🙏
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="cookie-robot">
        <NoData message={"."} />
      </div>
    </div>
  ) : (
    <></>
  );
};
