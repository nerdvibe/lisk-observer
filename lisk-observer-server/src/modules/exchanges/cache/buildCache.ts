import { exchangePricesCacheSet } from ".";
import { fetchExchangesPrices } from "../fetchExchangesPrices";

export const buildExchangePricesCache = async () => {
  const exchangePrices = await fetchExchangesPrices();

  exchangePricesCacheSet(exchangePrices);
};

export const initEmptyExchangePricesCache = () => {
  exchangePricesCacheSet([]);
};
