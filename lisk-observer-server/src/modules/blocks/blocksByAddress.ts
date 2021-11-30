import { archiveDb, coreDb } from "../../db";
import { accountsByAddressCacheGet } from "@modules/accounts/cache/currentCache";

export const blocksByAddress = async (address: string, page) => {
  if (!address) {
    return [];
  }

  const account = accountsByAddressCacheGet(address);

  const blocks = await coreDb("blocks")
    .select(
      "blocks.id",
      "blocks.height",
      "blocks.generatorPublicKey",
      "blocks.timestamp",
      "blocks.reward",
      "blocks.isFinal"
    )
    .where("generatorPublicKey", account.publicKey)
    .orderBy("timestamp", "DESC")
    .paginate({
      perPage: 50,
      currentPage: page,
      isLengthAware: true,
    });

  return blocks;
};
