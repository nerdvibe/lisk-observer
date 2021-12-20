import React from "react";
import { useParams } from "react-router-dom";
import { CurrentAccount } from "./currentAccount/CurrentAccount";
import { LegacyAccount } from "./legacyAccount/LegacyAccount";
import { isLegacyAddress } from "../utils/account";

export interface AccountContainerParams {
  addressContext: string;
  page?: string;
  tab?: string;
}

export const AccountContainer: React.FC = () => {
  let { addressContext: addressContextParam } = useParams<
    AccountContainerParams
  >();
  const isLegacy = isLegacyAddress(addressContextParam);

  return (
    <div className="content">
      {isLegacy ? <LegacyAccount /> : <CurrentAccount />}
    </div>
  );
};
