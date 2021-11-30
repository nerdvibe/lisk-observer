import { logger } from "@modules/log";
import NodeCache from "node-cache";
import { SUPPORTED_CURRENCIES } from "@modules/prices/const";

const LAST_PRICES_CACHE_NAME = "lastPrices";
const FIAT_PRICES_CACHE_NAME = "fiatPrices";

const log = logger("CACHE_PRICES");

interface Prices {
  currency: string;
  date: string[];
  value: string[];
}
interface LastPrices {
  LSKUSD: number;
  LSKBTC: number;
  LSKEUR: number;
  LSKKRW: number;
  LSKPLN: number;
  LSKJPY: number;
  LSKCNY: number;
  LSKAED: number;
}
interface FiatPrices {
  JPY: number;
  CNY: number;
  AED: number;
  PLN: number;
}
//
const historicalPricesCache = new NodeCache();
const lastPricesCache = new NodeCache();
const fiatPricesCache = new NodeCache();
//
export const historicalPricesCacheSet = async (prices: Prices[]) => {
  const values = prices.map((v) => {
    return {
      key: v.currency,
      val: {
        date: v.date,
        value: v.value,
      },
    };
  });

  await historicalPricesCache.mset(values);
};
export const lastPricesCacheSet = async (prices: LastPrices) => {
  await lastPricesCache.set(LAST_PRICES_CACHE_NAME, prices);
};
export const fiatPricesCacheSet = async (prices: FiatPrices) => {
  await fiatPricesCache.set(FIAT_PRICES_CACHE_NAME, prices);
};
//
export const historicalPricesByCurrencyCacheGet = (
  currency: SUPPORTED_CURRENCIES
): Prices | undefined => {
  const prices = historicalPricesCache.get(currency);

  if (!prices) {
    return undefined;
  }

  return {
    currency,
    date: ((prices as unknown) as Prices)?.date,
    value: ((prices as unknown) as Prices).value,
  };
};

export const lastPricesCacheGet = (): LastPrices | undefined => {
  const prices: LastPrices = lastPricesCache.get(LAST_PRICES_CACHE_NAME);

  if (!prices) {
    return undefined;
  }

  return prices;
};
export const fiatPricesCacheGet = (): FiatPrices | undefined => {
  const prices: FiatPrices = fiatPricesCache.get(FIAT_PRICES_CACHE_NAME);

  if (!prices) {
    return undefined;
  }

  return prices;
};
