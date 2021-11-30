import axios from "axios";
import {
  HEIGHT_CACHE_KINDS,
  heightsCacheSet,
} from "@modules/blocks/cache/index";
import { coreDb } from "../../../db";

export const buildFinalizedHeightCache = async () => {
  const { data: block } = await axios.get(
    `${process.env.LISK_SERVICE_URL}/network/status`,
    {
      timeout: 2000000,
    }
  );

  await heightsCacheSet(
    HEIGHT_CACHE_KINDS.FINALIZED,
    block.data.finalizedHeight
  );
};
export const buildLastBlockCache = async () => {
  const block = await coreDb("blocks")
    .select(
      "blocks.id",
      "blocks.height",
      "blocks.generatorPublicKey",
      "blocks.timestamp",
      "blocks.reward",
      "blocks.isFinal"
    )
    .limit(1)
    .orderBy("height", "desc")
    .first();

  await heightsCacheSet(HEIGHT_CACHE_KINDS.LAST_BLOCK, block);
};
