import React, { RefObject, useEffect, useRef, useState } from "react";

// reactstrap components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CURRENCY_BASE, CURRENCY_PAIRS } from "../components/chartBanner/const";
import { Col, Row } from "reactstrap";

interface Props {
  setTicker: (ticker: CURRENCY_PAIRS) => void;
}
export const FixedPlugin: React.FC<Props> = ({ setTicker }) => {
  const menuRef = useRef(null);
  const [classes, setClasses] = useState("dropdown show-dropdown");
  const [selectedCurrency, setSelectedCurrency] = useState(
    CURRENCY_PAIRS.LSKUSD
  );

  useEffect(() => {
    if (localStorage.getItem("white-content")) {
      document.body.classList.add("white-content");
    }
    const currency = localStorage.getItem("currency") as CURRENCY_PAIRS;
    if (currency && Object.values(CURRENCY_PAIRS).includes(currency)) {
      setSelectedCurrency(currency);
      setTicker(currency);
    } else {
      setSelectedCurrency(CURRENCY_PAIRS.LSKUSD);
      setTicker(CURRENCY_PAIRS.LSKUSD);
    }
  }, [setTicker]);

  const handleClick = () => {
    if (classes === "dropdown show-dropdown") {
      setClasses("dropdown show-dropdown show");
    } else {
      setClasses("dropdown show-dropdown");
    }
  };

  const activateMode = (mode: string) => {
    switch (mode) {
      case "light":
        document.body.classList.add("white-content");
        localStorage.setItem("white-content", "true");
        break;
      default:
        document.body.classList.remove("white-content");
        localStorage.removeItem("white-content");
        break;
    }
  };

  const currencySelector = (currency: CURRENCY_PAIRS) => {
    setSelectedCurrency(currency);
    localStorage.setItem("currency", currency);
    setTicker(currency);
  };

  /**
   * Hook that alerts clicks outside of the passed ref
   */
  const useOutsideAlerter = (ref: RefObject<HTMLDivElement>) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          document.getElementsByClassName("show-dropdown")[0].className =
            "dropdown show-dropdown";
          setClasses("dropdown show-dropdown");
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  useOutsideAlerter(menuRef);

  return (
    <div className="fixed-plugin border-radius-10" ref={menuRef}>
      <div className={classes}>
        <div onClick={handleClick}>
          <FontAwesomeIcon className="fixed-plugin-icon" icon={"cog"} />
        </div>
        <ul className="dropdown-menu show">
          <li className="header-title">Observer mode:</li>
          <li className="adjustments-line text-center color-change">
            <span className="color-label">LIGHT MODE</span>{" "}
            <span
              className="badge light-badge mr-2"
              onClick={() => activateMode("light")}
            />{" "}
            <span
              className="badge dark-badge ml-2"
              onClick={() => activateMode("dark")}
            />{" "}
            <span className="color-label">DARK MODE</span>{" "}
          </li>
          <li className="header-title">Currency :</li>
          <li className="adjustments-line text-center color-change currencies-line">
            <Row className="pl-4 pr-4 d-flex justify-content-center">
              {Object.values(CURRENCY_PAIRS).map((currency: CURRENCY_PAIRS) => (
                <Col sm={3}>
                  <div
                    className={`badge mb-2 ${
                      selectedCurrency === currency
                        ? "light-badge"
                        : "dark-badge"
                    }`}
                    onClick={() => currencySelector(currency)}
                  />{" "}
                  <div className="color-label">{CURRENCY_BASE[currency]}</div>{" "}
                </Col>
              ))}
            </Row>
          </li>
        </ul>
      </div>
    </div>
  );
};
