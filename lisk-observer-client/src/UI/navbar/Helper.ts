export const hasNoResults = (searchboxResult: any, searchText: string) => {
  if (searchboxResult?.search) {
    const { transactions, blocks, accounts } = searchboxResult?.search;
    return (
      searchText &&
      transactions?.length === 0 &&
      blocks?.length === 0 &&
      accounts?.length === 0
    );
  }
  return false;
};
