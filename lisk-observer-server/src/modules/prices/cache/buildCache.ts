import { fetchHistoricalPrices } from "@modules/prices/fetchHistoricalPrices";
import {
  fiatPricesCacheSet,
  historicalPricesCacheSet,
  lastPricesCacheSet,
} from "@modules/prices/cache/index";
import { fetchLastPrices } from "@modules/prices/fetchLastPrices";
import { fetchFiatPrices } from "@modules/prices/fetchFiatPrices";

export const initEmptyFiatPricesCache = async () => {
  await fiatPricesCacheSet({
    JPY: 0,
    CNY: 0,
    AED: 0,
    PLN: 0,
  });
};

export const initEmptyPricesCache = async () => {
  await historicalPricesCacheSet([]);
};

export const initEmptyLastPricesCache = async () => {
  await lastPricesCacheSet({
    LSKUSD: 0,
    LSKBTC: 0,
    LSKEUR: 0,
    LSKKRW: 0,
    LSKPLN: 0,
    LSKJPY: 0,
    LSKCNY: 0,
    LSKAED: 0,
  });
};

export const buildFiatPricesCache = async () => {
  const fiatPrices = await fetchFiatPrices();
  await fiatPricesCacheSet(fiatPrices);
};

export const buildPricesCache = async () => {
  const historicalPrices = await fetchHistoricalPrices();
  await historicalPricesCacheSet(historicalPrices);
};

export const buildLastPricesCache = async () => {
  const lastPrices = await fetchLastPrices();

  await lastPricesCacheSet(lastPrices);
};
