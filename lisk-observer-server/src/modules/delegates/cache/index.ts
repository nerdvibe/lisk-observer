import { logger } from "@modules/log";
import NodeCache from "node-cache";
import { buildDelegatesCacheFromCore } from "./buildCache";
import { Dpos } from "@modules/delegates/types";

const log = logger("CACHE_DELEGATES");

interface DelegateCache {
  key: string;
  val: Dpos;
}
interface DelegatesByAddressCacheGet {
  address: string;
  username: string;
  dpos: Dpos;
}

export const delegatesCache = new NodeCache();

export const delegatesCacheSet = async (values: DelegateCache[]) => {
  await delegatesCache.mset(values);
};

export const delegatesByAddressCacheGet = (
  address: string
): DelegatesByAddressCacheGet | undefined => {
  const delegate = delegatesCache.get(address);

  if (!delegate) {
    return undefined;
  }

  return {
    address,
    username: ((delegate as unknown) as Dpos)?.delegate?.username,
    dpos: (delegate as unknown) as Dpos,
  };
};

export const allDelegatesCache = (): DelegatesByAddressCacheGet[] => {
  const keys = delegatesCache.keys();
  const delegatesCached = delegatesCache.mget(keys);

  const delegates = Object.keys(delegatesCached).map((address) => {
    return {
      address,
      username: ((delegatesCached[address] as unknown) as Dpos)?.delegate
        ?.username,
      dpos: (delegatesCached[address] as unknown) as Dpos,
    };
  });

  const delegatesSorted = delegates.sort(
    (a, b) => a.dpos.delegate.rankAdjusted - b.dpos.delegate.rankAdjusted
  );

  return delegatesSorted;
};

// Delegate promises

const delegatesPromiseesCache = new NodeCache();

enum delegatesPromisescacheKeys {
  "SHARES" = "SHARES",
}

export const delegatesPromisesCacheSet = async (value: string) => {
  await delegatesPromiseesCache.set(delegatesPromisescacheKeys.SHARES, value);
};

export const delegatesPromisesGet = (): string | undefined => {
  return delegatesPromiseesCache.get(delegatesPromisescacheKeys.SHARES);
};
