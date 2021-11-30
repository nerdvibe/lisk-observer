import React from "react";
import { Card, CardHeader, CardTitle } from "reactstrap";
import { Spinner } from "../spinner/Spinner";

interface Props {
  title: string;
  data: any;
  icon: string;
  loading?: boolean;
  error?: boolean;
}
export const NumberCard = ({ title, data, icon, loading, error }: Props) => {
  if (error) {
    return (
      <Card className="card-chart">
        <CardHeader>
          <h5 className="card-category">{title}</h5>
          <CardTitle tag="h3">Error fetching this data</CardTitle>
        </CardHeader>
      </Card>
    );
  }
  if (loading) {
    return (
      <Card className="card-chart">
        <CardHeader>
          <h5 className="card-category">{title}</h5>
          <CardTitle tag="h3">
            <Spinner /> Loading...
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }
  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <h5 className="card-category">{title}</h5>
          <CardTitle tag="h3">
            <i className={`${icon} text-info`} /> {data}
          </CardTitle>
        </CardHeader>
      </Card>
    </>
  );
};
