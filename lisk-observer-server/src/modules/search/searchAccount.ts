import { archiveDb, coreDb } from "../../db";
import { isLegacyAddress } from "@modules/utils/lisk/addresses";

export const searchAccount = async (term: string) => {
  let accounts = [];
  let accountResult = [];

  try {
    // search by legacy address
    if (isLegacyAddress(term)) {
      accountResult = await archiveDb("mem_accounts")
        .select("address", "username")
        .where("address", term);
    } else if (term.length > 30) {
      // search by address
      accountResult = await coreDb("accounts")
        .select("address", "username")
        .where("address", term)
        .limit(4);

      // search username
    } else {
      accountResult = await coreDb("accounts")
        .select("address", "username")
        .where("username", "like", `${term}%`)
        .limit(3);
    }
  } catch (e) {
    // gulp;
  }

  accounts = accountResult?.map((element) => {
    return {
      address: element?.address,
      username: element?.username,
    };
  });

  return accounts;
};
