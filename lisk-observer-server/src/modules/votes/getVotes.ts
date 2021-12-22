import { coreDb } from "../../db";
import { accountsByAddressCacheGet } from "@modules/accounts/cache/currentCache";

export const getVotes = async (page: number) => {
  const votes = await coreDb("votes")
    .select("id", "amount", "sentAddress", "receivedAddress", "timestamp")
    .orderBy("timestamp", "DESC")
    .paginate({
      perPage: 100,
      currentPage: page,
      isLengthAware: true,
    });

  const enrichedVotes = votes.data.map((v) => {
    const cacheSender = accountsByAddressCacheGet(v.sentAddress);
    const cacheRecipient = accountsByAddressCacheGet(v.receivedAddress);

    return {
      ...v,
      senderUsername: cacheSender.username,
      recipientUsername: cacheRecipient.username,
    };
  });

  return {
    ...votes,
    data: enrichedVotes,
  };
};
