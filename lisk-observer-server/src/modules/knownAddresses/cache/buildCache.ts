import { coreDb } from "../../../db";
import { knownAddressesCacheGetAll, knownAddressesCacheSet } from "./index";

export const buildKnownAddressesCacheFromDB = async () => {
  //select known_addresses.*, balance from known_addresses INNER JOIN accounts ON known_addresses.address=accounts.address;
  const knownAddresses = await coreDb("known_addresses")
    .select("known_addresses.*", "accounts.balance")
    .innerJoin("accounts", "known_addresses.address", "accounts.address");

  const knownAddressesSorted = knownAddresses.sort(
    (a, b) => b.balance - a.balance
  );

  const knownAddressesSanitized = knownAddressesSorted.map((k) => {
    return {
      address: k.address,
      identifier: k.identifier,
      isExchange: !!k.is_exchange,
      isLiskHq: !!k.is_liskhq,
      isScam: !!k.is_scam,
      tag: k.tag,
      balance: k.balance,
    };
  });

  await knownAddressesCacheSet(knownAddressesSanitized);
};
