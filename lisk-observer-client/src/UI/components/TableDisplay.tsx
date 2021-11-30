import React from "react";
import { Card, Table, CardBody, CardTitle, CardHeader } from "reactstrap";

export const TableDisplay = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Last Transactions</CardTitle>
        </CardHeader>
        <CardBody>
          <Table className="tablesorter" responsive>
            <thead className="text-primary">
              <tr>
                <th>ID</th>
                <th>From</th>
                <th>To</th>
                <th className="text-center">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>xxxxx</td>
                <td>Carbonara</td>
                <td>Lemii</td>
                <td className="text-center">Ⱡ 36,738</td>
              </tr>
              <tr>
                <td>xxxxx</td>
                <td>Carbonara</td>
                <td>21211321231L</td>
                <td className="text-center">Ⱡ 36,738</td>
              </tr>
              <tr>
                <td>xxxxx</td>
                <td>Lemii</td>
                <td>Lemii</td>
                <td className="text-center">Ⱡ 36,738</td>
              </tr>
              <tr>
                <td>xxxxx</td>
                <td>Carbonara</td>
                <td>Lemii</td>
                <td className="text-center">Ⱡ 36,738</td>
              </tr>
              <tr>
                <td>xxxxx</td>
                <td>Carbonara</td>
                <td>Lemii</td>
                <td className="text-center">Ⱡ 36,738</td>
              </tr>
              <tr>
                <td>xxxxx</td>
                <td>Carbonara</td>
                <td>Lemii</td>
                <td className="text-center">Ⱡ 36,738</td>
              </tr>
              <tr>
                <td>xxxxx</td>
                <td>Carbonara</td>
                <td>Lemii</td>
                <td className="text-center">Ⱡ 36,738</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
};
