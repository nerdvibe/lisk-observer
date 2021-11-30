import { archiveDb, coreDb } from "../../db";

export const searchTransaction = async (term: string) => {
  const transaction = [];

  try {
    if (term.length > 10) {
      let tx = await coreDb("transactions")
        .select("id", "height")
        .where("id", term)
        .first();

      if (!tx?.id) {
        tx = await archiveDb("trs").select("*").where("id", term).first();
      }

      if (tx?.id) {
        transaction.push({
          id: tx.id,
          height: tx.height || -1,
        });
      }
    }
  } catch (e) {
    // gulp;
  }

  return transaction;
};
