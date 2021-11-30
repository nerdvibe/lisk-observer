import React from "react";
import { AvatarSize, DelegateLogo } from "../utils/logos/DelegateLogo";
import { Link } from "react-router-dom";

interface Props {
  username: string;
  address: string;
}

export const CardUsername = ({ username, address }: Props) => (
  <div className="block-card-value text-truncate">
    {address ? (
      <DelegateLogo
        delegateName={username}
        address={address}
        generateRandom={true}
        className="mr-2"
        size={AvatarSize.SMALL}
      />
    ) : null}
    {address ? <Link to={`/account/${address}`}>{username}</Link> : username}
  </div>
);
