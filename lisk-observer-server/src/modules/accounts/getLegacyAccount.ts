import { archiveDb } from "../../db";

interface LegacyAccount {
  username?: string;
  balance: string;
  publicKey?: string;
  address: string;
}

export const getLegacyAccount = async (
  address: string
): Promise<LegacyAccount> => {
  const account = await archiveDb("mem_accounts")
    .select("username", "balance", "publicKey", "address")
    .where("address", address)
    .first();

  return account;
};
