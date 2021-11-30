import React from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import { AvatarSize, DelegateLogo } from "../utils/logos/DelegateLogo";
import { beddowsToDecimal } from "../utils/lisk/utils/lisk/beddowsToDecimal";
interface Props {
  id: string;
  transferData: string;
  timestamp: string;
  sender: string;
  senderId: string;
  delegateName?: string;
  amount: string;
}

export const LastMessageElement: React.FC<Props> = ({
  id,
  transferData,
  timestamp,
  senderId,
  sender,
  amount,
}) => {
  return (
    <tr key={id}>
      <td>
        <Row>
          <Col className="my-auto text-center p-0" xs={3} lg={1}>
            <Link to={`/account/${senderId}`}>
              <DelegateLogo
                delegateName={senderId}
                address={senderId}
                generateRandom={true}
                className="p-0 ml-2"
                size={AvatarSize.BIG}
              />
            </Link>
          </Col>
          <Col xs={9} lg={11}>
            <div className="bubble">
              <p className="title text-dark">{transferData}</p>
              <p className="text-muted">
                <Link to={`/account/${senderId}`}>{sender}</Link> -{" "}
                {beddowsToDecimal(amount).toFixed(2)} LSK -{" "}
                <Link to={`/transaction/${id}`}>
                  {moment(+timestamp * 1000).fromNow()}
                </Link>
              </p>
            </div>
          </Col>
        </Row>
      </td>
    </tr>
  );
};
