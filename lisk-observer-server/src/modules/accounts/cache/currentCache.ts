import { logger } from "@modules/log";
import NodeCache from "node-cache";
import { buildAddressesCacheFromDB } from "./buildCache";
import axios from "axios";

const log = logger("CACHE_ADDRESS_PKEY");

export interface Address {
  address: string;
  publicKey: string;
}
export interface Vote {
  delegateAddress: string;
  amount: string;
}
export interface Account {
  account: string;
  publicKey: string;
  address: string;
  username?: string;

  isDelegate?: number;
  token?: { balance: string; locked: string };
  sequence?: { nonce: string };
  keys?: {
    numberOfSignatures: number;
    mandatoryKeys: string[];
    optionalKeys: string[];
  };
  dpos?: {
    delegate?: {
      username: string;
      pomHeights: any[];
      consecutiveMissedBlocks: number;
      lastForgedHeight: number;
      isBanned: boolean;
      totalVotesReceived: string;
    };
    sentVotes?: Vote[];
    // TODO: Type this
    unlocking?: any[];
  };
  hexAddress?: string;
}
interface AccountByPublicKey {
  [key: string]: string;
}

const publicKeyByAddressCache = new NodeCache();
const addressByPublicKeyCache = new NodeCache();
const accountsByPublicKeyCache = new NodeCache();
const accountsByAddressCache = new NodeCache();

(async () => {
  // @boot time
  try {
    await buildAddressesCacheFromDB();
  } catch (e) {
    log.error("caching failed");
  }
})();

export const addressesCacheSet = async (adresses: Address[]) => {
  const filteredAddresses = adresses.filter((v) => v.address && v.publicKey);
  const adressesKeyPubKeyVal = filteredAddresses.map((v) => ({
    key: v.address,
    val: v.publicKey,
  }));
  const pubKeyKeyAddressVal = filteredAddresses.map((v) => ({
    key: v.publicKey,
    val: v.address,
  }));

  await publicKeyByAddressCache.mset(adressesKeyPubKeyVal);
  await addressByPublicKeyCache.mset(pubKeyKeyAddressVal);
};

export const accountCacheSet = async (account: Account[]) => {
  const filteredAccounts = account.filter((v) => v.account && v.publicKey);
  const pubKeyKeyAccountVal = filteredAccounts.map((v) => ({
    key: v.publicKey,
    val: v.account,
  }));
  const addressKeyAccountVal = account.map((v) => ({
    key: v.address,
    val: v.account,
  }));

  await accountsByPublicKeyCache.mset(pubKeyKeyAccountVal);
  await accountsByAddressCache.mset(addressKeyAccountVal);
};

// TODO Remove do not use
export const publicKeyByAddressCacheGet = (
  address: string
): string | undefined => {
  return publicKeyByAddressCache.get(address);
};

// TODO Remove do not use
export const adressesByPublicKeyCacheGet = (
  publicKey: string
): string | undefined => {
  return addressByPublicKeyCache.get(publicKey);
};

export const accountsByPublicKeyCacheGet = (publicKey: string): Account => {
  return JSON.parse(accountsByPublicKeyCache.get(publicKey) || "{}");
};
export const accountsByPublicKeyCacheGetEnriched = async (
  publicKey: string
): Promise<Account> => {
  return await enrichAccount(
    JSON.parse(accountsByPublicKeyCache.get(publicKey) || "{}")
  );
};

export const accountsByPublicKeyCacheGetAll = ():
  | AccountByPublicKey
  | undefined => {
  const accountKeys = accountsByPublicKeyCache.keys();
  const accounts = accountsByPublicKeyCache.mget(accountKeys);

  return accounts as any;
};
export const accountsByAddressCacheGetAll = ():
  | AccountByPublicKey
  | undefined => {
  const accountKeys = accountsByAddressCache.keys();
  const accounts = accountsByAddressCache.mget(accountKeys);

  return accounts as any;
};

export const accountsByAddressCacheGet = (address: string): Account => {
  return JSON.parse(accountsByAddressCache.get(address) || "{}");
};
export const accountsByAddressCacheGetEnriched = async (
  address: string
): Promise<Account> => {
  return await enrichAccount(
    JSON.parse(accountsByAddressCache.get(address) || "{}")
  );
};

const enrichAccount = async (account: any) => {
  if (!account?.account?.hexAddress && !account?.hexAddress) {
    return {};
  }
  const { data: accountData } = await axios.get(
    `${process.env.LISK_CORE_API_URL}/accounts/${
      account.hexAddress || account?.account?.hexAddress
    }`
  );
  const lockedBalance = accountData.data.dpos.sentVotes.reduce((acc, curr) => {
    return +curr.amount + acc;
  }, 0);

  account.account = {
    ...account.account,
    ...accountData.data,
    token: {
      balance: account.token.balance,
      locked: lockedBalance,
    },
  };
  return account;
};
