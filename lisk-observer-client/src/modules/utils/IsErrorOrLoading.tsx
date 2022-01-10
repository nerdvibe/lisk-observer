import "./style.css";
import React from "react";
import { Card, CardBody } from "reactstrap";
import { Spinner } from "../../UI/spinner/Spinner";
import ObserverLogo from "../../UI/navbar/lisk-observer.svg";
import TelescopeAnimation from "../../UI/assets/telescope.svg";

interface Props {
  error: boolean;
  errorMsg?: string;
  loadingMsg?: string;
  title: string;
}

export const IsErrorOrLoading: React.FC<Props> = ({
  error,
  errorMsg,
  loadingMsg,
  title,
}) => {
  return (
    <div className="super-fast-fade-in">
      <Card>
        <CardBody className="loader-container">
          <div>
            <object
              className="telescope-icon loader-logo"
              data={TelescopeAnimation}
              type="image/svg+xml"
              aria-label="lisk.observer logo"
            />
          </div>
          <div>
            <img
              src={ObserverLogo}
              alt="Lisk.observer"
              className="loader-logo-text inline-element"
            />
          </div>
          {error ? (
            !errorMsg ? (
              `Error while fetching the ${
                title.charAt(0).toLowerCase() + title.slice(1)
              }`
            ) : (
              errorMsg
            )
          ) : (
            <div>
              <div className="inline-element spinner-loader">
                <Spinner />
              </div>
              <h5 className=" loader-logo-text mb-0 inline-element">
                {loadingMsg
                  ? loadingMsg
                  : `Loading ${title.charAt(0).toUpperCase() + title.slice(1)}`}
              </h5>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
