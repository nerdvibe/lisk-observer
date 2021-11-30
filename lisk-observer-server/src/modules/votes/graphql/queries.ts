import { logger } from "@modules/log";
import { sendGraphqlError } from "../../../graphql/util";
import { getVotes } from "@modules/votes/getVotes";

const log = logger("VOTES_QUERIES");

export const queries = {
  votes: async ({ page = 1 }) => {
    try {
      const votes = await getVotes(page);

      return votes;
    } catch (e) {
      log.error(e);
      sendGraphqlError(new Error("Error fetching the votes data"));
    }
  },
};
