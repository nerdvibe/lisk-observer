import React from "react";
import { useParams } from "react-router-dom";
import { CurrentAccount } from "./currentAccount/CurrentAccount";
import { LegacyAccount } from "./legacyAccount/LegacyAccount";
import { isLegacyAddress } from "../utils/account";
import { IsErrorOrLoading } from "../../utils/IsErrorOrLoading";
import { isAddress } from "../../utils/lisk/utils/lisk/regex";
import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { gql } from "graphql.macro";

export interface AccountContainerParams {
  addressContext: string;
  page?: string;
  tab?: string;
}

const USERNAME_QUERY = gql`
  query {
    lastBlocks {
      data {
        id
        height
        timestamp
        generatorPublicKey
        finalized
        isFinal
        address
        username
        reward
      }
    }
  }
`; // QUERY PLACEHOLDER

export const AccountContainer: React.FC = () => {
  let { addressContext: addressContextParam } = useParams<
    AccountContainerParams
  >();
  const [
    getUsernameData,
    { data: usernameData, loading: usernameLoading, error: usernameError },
  ] = useLazyQuery(USERNAME_QUERY);
  const isLegacy = isLegacyAddress(addressContextParam);
  const isUsername = !(isAddress(addressContextParam) || isLegacy);

  useEffect(() => {
    if (isUsername) {
      getUsernameData({
        variables: {
          username: addressContextParam,
        },
      });
    }
  }, []);

  if (isUsername && (usernameLoading || usernameError)) {
    return (
      <div className="content">
        <IsErrorOrLoading
          error={!!usernameError}
          errorMsg={`Username ${addressContextParam} not found`}
          title={"Account page"}
        />
      </div>
    );
  }

  return (
    <div className="content">
      {isLegacy ? <LegacyAccount /> : <CurrentAccount />}
    </div>
  );
};
