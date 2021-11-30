import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";
import { ExchangeLogo } from "../utils/logos/ExchangeLogo";
import { beddowsToDecimal } from "../utils/lisk/utils/lisk/beddowsToDecimal";
import "./style.css";
import { AvatarSize } from "../utils/logos/DelegateLogo";

interface Props {
  address: string;
  tag: string;
  balance: number;
  isExchange?: boolean;
  isLiskHQ?: boolean;
  isScam?: boolean;
  identifier?: string;
  size?: AvatarSize;
}

export const KnownAddressElement: React.FC<Props> = ({
  address,
  tag,
  balance,
  isExchange,
  isLiskHQ,
  isScam,
  identifier = "",
}) => {
  return (
    <tr>
      <td>
        <Link className="address-image-container " to={`/account/${address}`}>
          <ExchangeLogo
            identifier={identifier}
            address={address}
            size={AvatarSize.BIG}
          />
        </Link>
        <div className="address-data-container pl-2">
          <div>
            <p className="title w-100">
              {tag}
              <span className="float-right">
                {isExchange ? (
                  <Badge className={"badge-info font-m"}>Exchange</Badge>
                ) : null}
                {isLiskHQ ? (
                  <Badge className={"badge-info font-m"}>Lisk HQ</Badge>
                ) : null}
                {isScam ? (
                  <Badge className={"badge-danger font-m"}>Scam!</Badge>
                ) : null}
              </span>
            </p>
          </div>
          <p className="text-muted">
            <Link to={`/account/${address}`}>{address}</Link>
            <span className="float-right">
              <Badge className={"badge-dark font-m"}>
                {(+beddowsToDecimal(balance).toFixed(2)).toLocaleString()} LSK
              </Badge>
            </span>
          </p>
        </div>
      </td>
    </tr>
  );
};
