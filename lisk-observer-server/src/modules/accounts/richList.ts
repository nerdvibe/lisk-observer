import { coreDb } from "../../db";

export const richList = async (page: number) => {
  const accounts = await coreDb("accounts")
    .select(
      "address",
      "balance as unlocked",
      coreDb.raw("SUM(balance + COALESCE(in_vote, 0)) as balance"),
      "username"
    )
    .joinRaw(
      `left join (
    SELECT sentAddress,SUM(amount) AS in_vote 
    FROM votes
    GROUP BY sentAddress 
)votes ON accounts.address = votes.sentAddress`
    )
    .where("balance", ">", 0)
    .groupBy("address")
    .orderBy("balance", "desc")
    .paginate({
      perPage: 50,
      currentPage: page,
      isLengthAware: true,
    });

  return accounts;
};
