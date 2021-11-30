import { sendGraphqlError } from "../../../graphql/util";
import { logger } from "@modules/log";
import {
  accountsByAddressCacheGet,
  accountsByAddressCacheGetEnriched,
} from "@modules/accounts/cache/currentCache";
import {
  getBase32AddressFromHex,
  isLegacyAddress,
} from "@modules/utils/lisk/addresses";
import { getLegacyAccount } from "@modules/accounts/getLegacyAccount";
import { delegatesByAddressCacheGet } from "@modules/delegates/cache";
import { getReceivedVotes } from "@modules/accounts/getReceivedVotes";
import { richList } from "@modules/accounts/richList";
import { calculateTotalSupply } from "@modules/utils/supply";
import {
  RICHLIST_MAX_CACHED_PAGES,
  richListCacheGetPage,
} from "@modules/accounts/cache/richListCache";

const log = logger("ACCOUNT_QUERIES");

enum Errors {
  LEGACY_NOT_COMPATIBLE = "Legacy address is not compatible with this query",
  NEW_NOT_COMPATIBLE = "New addresses are not compatible with this query",
}

export const queries = {
  account: async ({ address }) => {
    try {
      if (isLegacyAddress(address)) {
        throw new Error(Errors.LEGACY_NOT_COMPATIBLE);
      }
      const accountCache: any = await accountsByAddressCacheGetEnriched(
        address
      );
      const delegateCache: any = await delegatesByAddressCacheGet(address);

      accountCache.dpos = delegateCache?.dpos ? delegateCache?.dpos : {};
      accountCache.sequence = accountCache.account?.sequence;
      accountCache.token = accountCache.account?.token;
      accountCache.keys = accountCache.account?.keys;
      if (accountCache.account.dpos.sentVotes) {
        accountCache.dpos.sentVotes = accountCache.account.dpos.sentVotes.map(
          (vote) => {
            const address = getBase32AddressFromHex(vote.delegateAddress);
            const delegate = accountsByAddressCacheGet(address);

            return {
              ...vote,
              delegateAddress: address,
              delegateUsername: delegate.username,
            };
          }
        );
      }
      accountCache.dpos.receivedVotes = await getReceivedVotes(address);

      // unlocks
      if (accountCache.account.dpos.unlocking) {
        accountCache.dpos.unlocking = accountCache.account.dpos.unlocking.map(
          (unlock) => {
            const address = getBase32AddressFromHex(unlock.delegateAddress);
            const delegate = accountsByAddressCacheGet(address);

            return {
              amount: unlock.amount,
              unvoteHeight: unlock.unvoteHeight,
              delegateAddress: address,
              delegateUsername: delegate.username,
            };
          }
        );
      }

      return accountCache;
    } catch (e) {
      if (e.message === Errors.LEGACY_NOT_COMPATIBLE) {
        sendGraphqlError(e);
      } else {
        log.error(e);
        sendGraphqlError(new Error("Error fetching the account data"));
      }
    }
  },
  accountLegacy: async ({ address }) => {
    try {
      if (!isLegacyAddress(address)) {
        throw new Error(Errors.NEW_NOT_COMPATIBLE);
      }

      const legacyAccount = await getLegacyAccount(address);

      return {
        username: legacyAccount?.username,
        address: legacyAccount?.address,
        balance: legacyAccount?.balance,
        publicKey: Buffer.from(legacyAccount?.publicKey || "").toString("hex"),
      };
    } catch (e) {
      log.error(e);
      if (e.message === Errors.NEW_NOT_COMPATIBLE) {
        sendGraphqlError(e);
      } else {
        log.error(e);
        sendGraphqlError(new Error("Error fetching the account data"));
      }
    }
  },
  richList: async ({ page = 1 }) => {
    try {
      if (page < RICHLIST_MAX_CACHED_PAGES) {
        const richList = await richListCacheGetPage(page);
        return richList;
      } else {
        const supply = await calculateTotalSupply();
        const accounts = await richList(page);

        return { accounts, supply };
      }
    } catch (e) {
      log.error(e);
      sendGraphqlError(new Error("Error fetching the rich list data"));
    }
  },
};
