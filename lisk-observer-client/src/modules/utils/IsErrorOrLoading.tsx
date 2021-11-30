import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { Spinner } from "../../UI/spinner/Spinner";

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
    <Card className="card-chart">
      <CardHeader>
        <CardTitle tag="h4">
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </CardTitle>
        <CardBody>
          <CardTitle tag="h4">
            {error ? (
                !errorMsg ?(
              `Error while fetching the ${
                title.charAt(0).toLowerCase() + title.slice(1)
              }`
            ) : errorMsg)
                : (
              <>
                <Spinner />{" "}
                {loadingMsg ||
                  `Loading ${title.charAt(0).toLowerCase() + title.slice(1)}`}
                ...
              </>
            )}
          </CardTitle>
        </CardBody>
      </CardHeader>
    </Card>
  );
};
