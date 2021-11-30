import { logger } from "@modules/log";
import NodeCache from "node-cache";

const log = logger("CACHE_LEGACY_ADDRESS");

const legacyAccountsByAddressCache = new NodeCache();
const legacyAccountsByPublicKeyCache = new NodeCache();
const legacyAccountsByUsernameCache = new NodeCache();

interface legacyAccountCache {
  username?: string;
  address?: string;
  publicKey?: string;
}

export const legacyAddressesCacheSet = async (
  legacyAccount: legacyAccountCache[]
) => {
  const accountByAddress = legacyAccount.map((a) => {
    return { key: a.address, val: a };
  });
  const accountByPublicKey = legacyAccount
    .filter((a) => !!a.publicKey)
    .map((a) => {
      return { key: a.publicKey, val: a };
    });
  const accountByUsername = legacyAccount
    .filter((a) => !!a.username)
    .map((a) => {
      return { key: a.username, val: a };
    });

  legacyAccountsByAddressCache.mset(accountByAddress);
  legacyAccountsByPublicKeyCache.mset(accountByPublicKey);
  legacyAccountsByUsernameCache.mset(accountByUsername);
};

export const legacyAccountByAddressCacheGet = (
  address: string
): legacyAccountCache => {
  return legacyAccountsByAddressCache.get(address) || {};
};
export const legacyAccountByPublicKeyCacheGet = (
  publicKey: string
): legacyAccountCache => {
  return JSON.parse(legacyAccountsByPublicKeyCache.get(publicKey) || "{}");
};
export const legacyAccountByUsernameCacheGet = (
  username: string
): legacyAccountCache => {
  return JSON.parse(legacyAccountsByUsernameCache.get(username) || "{}");
};
