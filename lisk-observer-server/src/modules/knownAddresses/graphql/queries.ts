import { logger } from "@modules/log";
import { sendGraphqlError } from "../../../graphql/util";
import { knownAddressesCacheGetAll } from "@modules/knownAddresses/cache";

const log = logger("KNOWN_ADDRESSES_QUERIES");

export const queries = {
  knownAddresses: async () => {
    try {
      const knownAddresses = knownAddressesCacheGetAll();

      return knownAddresses;
    } catch (e) {
      log.error(e);
      sendGraphqlError(new Error("Error fetching the known addresses data"));
    }
  },
};
