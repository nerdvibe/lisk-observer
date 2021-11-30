export const resolvers = {
  BlockTransactionsOrLegacy: {
    __resolveType(block) {
      if (block.isLegacy) {
        return "BlockLegacy";
      } else {
        return "BlockWithTransactions";
      }
      return null;
    },
  },
};
