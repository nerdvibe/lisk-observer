import axios from "axios";
import { logger } from "@modules/log";

const log = logger("EXCHANGE_FIAT");

interface Prices {
  JPY: number;
  CNY: number;
  AED: number;
  PLN: number;
}

export const fetchFiatPrices = async (): Promise<Prices> => {
  if (
    !process.env.EXCHANGE_RATE_API_KEY ||
    process.env.SKIP_EXCHANGE_RATE == "true"
  ) {
    log.info("skipping fetching fiat prices");
    return {
      JPY: 0,
      CNY: 0,
      AED: 0,
      PLN: 0,
    };
  }

  const { data } = await axios.get(
    `${process.env.EXCHANGE_RATE_PROVIDER}${process.env.EXCHANGE_RATE_API_KEY}/latest/USD`
  );

  const JPY: number = data.conversion_rates?.JPY.toFixed(4) || -1;
  const CNY: number = data.conversion_rates?.CNY.toFixed(4) || -1;
  const AED: number = data.conversion_rates?.AED.toFixed(4) || -1;
  const PLN: number = data.conversion_rates?.PLN.toFixed(4) || -1;

  return {
    JPY,
    CNY,
    AED,
    PLN,
  };
};
