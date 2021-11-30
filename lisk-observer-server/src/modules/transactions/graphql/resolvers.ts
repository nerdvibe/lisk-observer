export const resolvers = {
  TransactionWithBlockOrLegacy: {
    __resolveType(tx) {
      if (tx?.transaction?.isLegacy) {
        return "TransactionWithBlockLegacy";
      } else {
        return "TransactionWithBlock";
      }
    },
  },
  PaginatedTransactionOrLegacy: {
    __resolveType(tx) {
      if (tx?.data[0]?.isLegacy) {
        return "PaginatedTransactionLegacy";
      } else {
        return "PaginatedTransaction";
      }
    },
  },
};
