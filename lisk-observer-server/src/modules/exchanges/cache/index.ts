import NodeCache from "node-cache";

export const exchangePricesCache = new NodeCache();
const exchangePricesCacheKey = "EXCHANGES_PRICES";

interface ExchangePricesCache {
  exchangeName: string;
  volume: number;
  image: string;
  markets: {
    base: string;
    target: string;
    last: number;
    trade_url?: string;
  }[];
}

export const exchangePricesCacheSet = async (value: ExchangePricesCache[]) => {
  await exchangePricesCache.set(exchangePricesCacheKey, value);
};

export const exchangePricesCacheGet = (): ExchangePricesCache[] => {
  return exchangePricesCache.get(exchangePricesCacheKey);
};
