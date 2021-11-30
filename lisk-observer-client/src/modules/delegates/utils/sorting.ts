import { MIN_SELF_VOTE_PERCENT } from "../../utils/const";

export enum SortingTypes {
  DESC = "desc",
  ASC = "asc",
}

export enum TableColumns {
  RANK = "rank",
  DELEGATE_NAME = "username",
  STATUS = "nextForgingTime",
  SELF_VOTES = "selfVotesAmount",
  CONSENSUS_WEIGHT = "consensusWeight",
  TOTAL_VOTES = "totalVotesReceived",
  PRODUCED_BLOCKS = "producedBlocks",
  POM = "pomHeights",
  VOTE_CAPACITY = "vote",
  SHARE = "share",
  BALANCE = "balance",
}

const sortDelegateAsc = (data: any[], field: string, byLength?: boolean) => {
  return data.slice().sort(function (a, b) {
    if (field === TableColumns.DELEGATE_NAME) {
      if (a.dpos.delegate.username < b.dpos.delegate.username) {
        return -1;
      }
      if (a.dpos.delegate.username > b.dpos.delegate.username) {
        return 1;
      }
      return 0;
    }
    if (byLength) {
      return a.dpos.delegate[field].length - b.dpos.delegate[field].length;
    }
    if (field === TableColumns.VOTE_CAPACITY) {
      const aVoteCapacity = getVoteCapacity(
        a.dpos.delegate.selfVotesAmount,
        a.dpos.delegate.totalVotesReceived
      );
      if (isNaN(+aVoteCapacity)) {
        return -1;
      }
      const bVoteCapacity = getVoteCapacity(
        b.dpos.delegate.selfVotesAmount,
        b.dpos.delegate.totalVotesReceived
      );
      return +aVoteCapacity - +bVoteCapacity;
    }
    return a.dpos?.delegate[field] - b.dpos?.delegate[field] || 1;
  });
};

const sortRichListAsc = (data: any[], field: string, byLength?: boolean) => {
  return data.slice().sort(function (a, b) {
    if (field === TableColumns.DELEGATE_NAME) {
      if (a.username < b.username) {
        return -1;
      }
      if (a.username > b.username) {
        return 1;
      }
      return 0;
    }
    if (byLength) {
      return a[field].length - b[field].length;
    }
    if (field === TableColumns.VOTE_CAPACITY) {
      const aVoteCapacity = getVoteCapacity(
        a.selfVotesAmount,
        a.totalVotesReceived
      );
      if (isNaN(+aVoteCapacity)) {
        return -1;
      }
      const bVoteCapacity = getVoteCapacity(
        b.selfVotesAmount,
        b.totalVotesReceived
      );
      return +aVoteCapacity - +bVoteCapacity;
    }
    return a[field] - b[field] || 1;
  });
};

const sortDelegateDesc = (data: any[], field: string, byLength?: boolean) => {
  return data.slice().sort(function (a, b) {
    if (field === TableColumns.DELEGATE_NAME) {
      if (b.dpos.delegate.username < a.dpos.delegate.username) {
        return -1;
      }
      if (b.dpos.delegate.username > a.dpos.delegate.username) {
        return 1;
      }
      return 0;
    }
    if (byLength) {
      return b.dpos.delegate[field].length - a.dpos.delegate[field].length;
    }
    if (field === TableColumns.VOTE_CAPACITY) {
      const aVoteCapacity = getVoteCapacity(
        a.dpos.delegate.selfVotesAmount,
        a.dpos.delegate.totalVotesReceived
      );
      if (isNaN(+aVoteCapacity)) {
        return 1;
      }
      const bVoteCapacity = getVoteCapacity(
        b.dpos.delegate.selfVotesAmount,
        b.dpos.delegate.totalVotesReceived
      );
      return +bVoteCapacity - +aVoteCapacity;
    }
    return b.dpos.delegate[field] - a.dpos.delegate[field];
  });
};

const sortRichListDesc = (data: any[], field: string, byLength?: boolean) => {
  return data.slice().sort(function (a, b) {
    if (field === TableColumns.DELEGATE_NAME) {
      if (b.username < a.username) {
        return -1;
      }
      if (b.username > a.username) {
        return 1;
      }
      return 0;
    }
    if (byLength) {
      return b[field].length - a[field].length;
    }
    if (field === TableColumns.VOTE_CAPACITY) {
      const aVoteCapacity = getVoteCapacity(
        a.selfVotesAmount,
        a.totalVotesReceived
      );
      if (isNaN(+aVoteCapacity)) {
        return 1;
      }
      const bVoteCapacity = getVoteCapacity(
        b.selfVotesAmount,
        b.totalVotesReceived
      );
      return +bVoteCapacity - +aVoteCapacity;
    }
    return b[field] - a[field];
  });
};

const getVoteCapacity = (selfVote: number | string, vote: number | string) => {
  const maxVotes = (+selfVote / MIN_SELF_VOTE_PERCENT) * 100;
  const available = +maxVotes - +vote;
  return ((available * 100) / maxVotes).toFixed(2);
};

export const sortTableColumn = (
  data: any[],
  column: TableColumns,
  sorting: SortingTypes
) => {
  if (data) {
    if (sorting === SortingTypes.ASC) {
      return sortDelegateAsc(data, column, column === TableColumns.POM);
    }
    if (sorting === SortingTypes.DESC) {
      return sortDelegateDesc(data, column, column === TableColumns.POM);
    }
  }
  return data;
};

export const sortRichListColumn = (
  data: any[],
  column: TableColumns,
  sorting: SortingTypes
) => {
  if (data) {
    if (sorting === SortingTypes.ASC) {
      return sortRichListAsc(data, column, column === TableColumns.POM);
    }
    if (sorting === SortingTypes.DESC) {
      return sortRichListDesc(data, column, column === TableColumns.POM);
    }
  }
  return data;
};
