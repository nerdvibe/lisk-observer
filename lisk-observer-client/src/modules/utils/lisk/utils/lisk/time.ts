const liskEpoch = new Date(Date.UTC(2016, 4, 24, 17, 0, 0, 0));
const liskEpochMs = liskEpoch.getTime();

// convert a Lisk Epoch date to regular date. Arg is in seconds, return is ms.
export const fromLiskEpoch = (timestamp: number) => {
  let toConvert = timestamp;

  if (toConvert < liskEpochMs) {
    toConvert = toConvert * 1000;
  }
  const humanTimestamp = liskEpochMs + toConvert;
  const date = new Date(humanTimestamp);
  return date;
};

// convert a regular date to Lisk Epoch. Timestamp arg is ms. Return is seconds
export const toLiskEpoch = (timestamp: number) => {
  return Math.floor((timestamp - liskEpochMs) / 1000);
};
