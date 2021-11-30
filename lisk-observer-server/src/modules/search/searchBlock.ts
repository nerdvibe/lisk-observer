import { archiveDb, coreDb } from "../../db";

export const searchBlock = async (term: string) => {
  const blocks = [];
  try {
    let block;

    // Search by height
    if (Number(term) && +term < 1000000000) {
      // new DB
      if (+term > +process.env.FORK_HEIGHT) {
        block = await coreDb("blocks")
          .select("id", "height")
          .where("height", term)
          .first();
        // legacy DB
      } else {
        block = await archiveDb("blocks")
          .select("id", "height")
          .where("height", term)
          .first();
      }

      // Search by blockId
    } else if (term.length > 10) {
      block = await coreDb("blocks")
        .select("id", "height")
        .where("id", term)
        .first();

      if (!block?.id) {
        block = await archiveDb("blocks")
          .select("id", "height")
          .where("id", term)
          .first();
      }
    }

    if (block?.id) {
      blocks.push({
        id: block.id,
        height: block.height,
      });
    }
  } catch (e) {
    // gulp;
  }

  return blocks;
};
