import { logger } from "@modules/log";

const log = logger("FN_BENCHMARK");

export const timeStart = () => {
  return new Date().getTime();
};

export const timeEnd = (start, fn, deltaMax = 7) => {
  const end = new Date().getTime();
  const deltaTime = (end - start) / 1000;
  if (deltaTime > deltaMax) {
    log.info(`FN ${fn} took ${deltaTime.toFixed(2)}s`);
  }
};
