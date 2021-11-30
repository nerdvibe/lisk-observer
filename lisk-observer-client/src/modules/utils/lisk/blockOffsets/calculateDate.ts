import moment from "moment";

const BLOCK_TIME = 10; //in seconds

export enum OFFSET_KIND {
  SELF_VOTE = 260000,
  UNVOTE = 2000,
  POM = 780000,
}

export const calculateTargetDate = (
  startHeight: number | string,
  currentHeight: number | string,
  offset: OFFSET_KIND
) => {
  const targetHeight = +startHeight + offset;
  const blocksRemaining = targetHeight - +currentHeight;
  const targetDate = moment(new Date()).add(
    blocksRemaining * BLOCK_TIME,
    "seconds"
  );
  const targetRelative = targetDate.fromNow();
  const targetDateFormat = moment(targetDate).format(
    "dddd D/MM/YYYY - HH:mm:ss ZZ"
  );

  return {
    targetHeight,
    targetDate,
    blocksRemaining,
    targetDateFormat,
    timestamp: +targetDate,
    targetRelative,
  };
};
