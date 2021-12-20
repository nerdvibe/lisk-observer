import React from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "../../UI/components/favoriteButton/FavoriteButton";
import RowCell from "../delegates/RowCell";
import { AvatarSize, DelegateLogo } from "../utils/logos/DelegateLogo";
import { ExchangeLogo } from "../utils/logos/ExchangeLogo";
import "./style.css";

interface Props {
  address: string;
  rank: number;
  balance: number | string;
  unlocked: number | string;
  delegatee: string;
  identifier?: string;
  username?: string;
  percentage?: number;
  highestPercentage?: number;
}

const AccountRow = ({
  address,
  username,
  rank,
  balance,
  unlocked,
  percentage,
  highestPercentage,
  identifier,
}: Props) => {
  const isTopTier = rank <= 10;
  const backgroundWidth =
    (percentage &&
      highestPercentage &&
      (percentage * 100) / highestPercentage) ||
    0;
  const locked = +balance - +unlocked;
  return (
    <tr className={`account-row `}>
      <td></td>
      <th scope="row-rank">
        <p className="pl-2">{rank}</p>
      </th>
      <td className="w-30px">
        <FavoriteButton alt address={address} username={username} />
      </td>
      <td className={isTopTier ? "shimmer" : ""}>
        {identifier ? (
          <ExchangeLogo
            identifier={identifier}
            address={address}
            className="mr-2"
            size={AvatarSize.MEDIUM}
          />
        ) : (
          <DelegateLogo
            delegateName={username || address}
            address={address}
            className="mr-2"
            size={AvatarSize.MEDIUM}
          />
        )}
        <Link to={`/account/${address}`}>
          <strong>{username}</strong>
        </Link>
      </td>
      <RowCell
        mainItem={`${balance.toLocaleString()} Ⱡ`}
        subItem={locked ? `${locked.toLocaleString()} Ⱡ` : ""}
        subDataTip="Locked balance"
        mainItemClass={"white-text"}
        subItemClass={"white-text"}
      />
      <td className="p-0">
        <div
          className="percentage-bg"
          style={{
            width: `${backgroundWidth}%`,
          }}
        />
        <div className="hover-value">
          <span className="font-xl">
            {percentage?.toFixed(2).toLocaleString().split(".")[0]}.
          </span>
          <span>
            {percentage?.toFixed(2).toLocaleString().split(".")[1] || "00"}
          </span>
          %
        </div>
      </td>
    </tr>
  );
};

export default AccountRow;
