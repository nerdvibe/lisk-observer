import NodeCache from "node-cache";

const knownAddresses = new NodeCache();

export interface KnownAddress {
  address: string;
  identifier: string;
  isExchange: boolean;
  isLiskHq: boolean;
  isScam: boolean;
  tag: string;
  balance: string;
}

export const knownAddressesCacheSet = async (addresses: KnownAddress[]) => {
  const keyvals = addresses.map((a) => {
    return {
      key: a.address,
      val: a,
    };
  });
  await knownAddresses.mset(keyvals);
};

export const knownAddressesCacheGetAll = (): unknown[] => {
  const keys = knownAddresses.keys();
  const cacheResult = knownAddresses.mget(keys);

  return Object.keys(cacheResult).map((v) => {
    return cacheResult[v];
  });
};
