import { addressesCacheSet, accountCacheSet } from "./currentCache";
import { archiveDb, coreDb } from "../../../db";
import { getHexAddressFromBase32 } from "@modules/utils/lisk/addresses";
import { legacyAddressesCacheSet } from "@modules/accounts/cache/legacyCache";
import { calculateTotalSupply } from "@modules/utils/supply";
import { richList } from "@modules/accounts/richList";
import {
  RICHLIST_MAX_CACHED_PAGES,
  richListCacheSet,
} from "@modules/accounts/cache/richListCache";

export const buildAddressesCacheFromDB = async () => {
  const addresses = await coreDb("accounts").select(
    "address",
    "publicKey",
    "username",
    "isDelegate",
    "balance"
  );

  const addressesValue = addresses.map((v) => ({
    address: v.address,
    publicKey: v.publicKey,
  }));

  const usernamesValue: any = [];
  for (const address of addresses) {
    const b32 = getHexAddressFromBase32(address.address);

    usernamesValue.push({
      publicKey: address.publicKey,
      address: address.address,
      account: JSON.stringify({
        username: address.username,
        address: address.address,
        publicKey: address.publicKey,
        isDelegate: address.isDelegate,
        hexAddress: b32,
        token: {
          balance: address.balance,
        },
      }),
    });
  }

  await addressesCacheSet(addressesValue);
  await accountCacheSet(usernamesValue);
};

export const buildLegacyAccountsFromDB = async () => {
  const legacyAccounts = await archiveDb("mem_accounts").select(
    "username",
    "address",
    "publicKey"
  );

  const legacyAccountsSanitized = legacyAccounts.map((a) => {
    return {
      ...a,
      publicKey: Buffer.from(a.publicKey || "").toString("hex") || null,
    };
  });

  await legacyAddressesCacheSet(legacyAccountsSanitized);
};

// caches the first 10 pages of the richlist
export const buildRichListCache = async () => {
  const supply = await calculateTotalSupply();
  for (let index = 1; index < RICHLIST_MAX_CACHED_PAGES; index++) {
    const accounts = await richList(index);
    const response = { accounts, supply };

    await richListCacheSet(index, response);
  }
};
