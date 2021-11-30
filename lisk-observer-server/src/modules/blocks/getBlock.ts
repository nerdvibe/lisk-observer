import { archiveDb, coreDb } from "../../db";
import { accountsByAddressCacheGet } from "@modules/accounts/cache/currentCache";
import { getBase32AddressFromPublicKey } from "@modules/utils/lisk/addresses";
import {
  HEIGHT_CACHE_KINDS,
  heightsByKeyCacheGet,
} from "@modules/blocks/cache";

interface GetBlock {
  id?: string;
  heightOrLegacyID?: string;
}

export const getBlock = async ({ id, heightOrLegacyID }: GetBlock = {}) => {
  let block;

  const height =
    !isNaN(+heightOrLegacyID) && +heightOrLegacyID < 1000000000000
      ? heightOrLegacyID
      : null;
  const legacyID =
    !isNaN(+heightOrLegacyID) && +heightOrLegacyID > 1000000000000
      ? heightOrLegacyID
      : null;

  // avoiding OR queries for performance concerns
  if (id) {
    block = await coreDb("blocks")
      .select(
        "blocks.id",
        "blocks.height",
        "blocks.generatorPublicKey",
        "blocks.timestamp",
        "blocks.reward",
        "blocks.isFinal"
      )
      .where("id", id)
      .limit(1)
      .first();
  } else if (height) {
    // core3.0
    if (height > process.env.FORK_HEIGHT) {
      block = await coreDb("blocks")
        .select(
          "blocks.id",
          "blocks.height",
          "blocks.generatorPublicKey",
          "blocks.timestamp",
          "blocks.reward",
          "blocks.isFinal"
        )
        .where("height", height)
        .limit(1)
        .first();
    } else {
      // legacy
      block = await archiveDb("blocks")
        .select(
          "id",
          "height",
          "numberOfTransactions",
          "totalAmount",
          "timestamp",
          "totalFee",
          "reward",
          "generatorPublicKey"
        )
        .where("height", height)
        .first();
      block.isLegacy = true;
      block.generatorPublicKey = Buffer.from(
        block?.generatorPublicKey || ""
      ).toString("hex");
      block.address = getBase32AddressFromPublicKey(block.generatorPublicKey);
      block.username =
        accountsByAddressCacheGet(block.generatorPublicKey)?.username || "";
    }
  } else if (legacyID) {
    block = await archiveDb("blocks")
      .select(
        "id",
        "height",
        "numberOfTransactions",
        "totalAmount",
        "timestamp",
        "totalFee",
        "reward",
        "generatorPublicKey"
      )
      .where("id", legacyID)
      .first();
    block.isLegacy = true;
    block.generatorPublicKey = Buffer.from(
      block?.generatorPublicKey || ""
    ).toString("hex");
  } else {
    // return last block available from Cache
    block = heightsByKeyCacheGet(HEIGHT_CACHE_KINDS.LAST_BLOCK);
  }

  if (!block) {
    return {};
  }
  if (block.height === +process.env.FORK_HEIGHT + 1) {
    return {
      ...block,
      username: "Genesis block",
      generatorPublicKey: "Genesis block",
      address: null,
    };
  }

  // TODO this mixes legacy data with new data
  block.address = getBase32AddressFromPublicKey(block.generatorPublicKey);
  block.username = accountsByAddressCacheGet(block.address)?.username || "";
  block.isFinal = !!block.isFinal;

  return block;
};
