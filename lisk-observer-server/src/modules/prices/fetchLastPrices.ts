import axios from "axios";
import { fiatPricesCacheGet } from "@modules/prices/cache";

interface Prices {
  LSKUSD: number;
  LSKBTC: number;
  LSKEUR: number;
  LSKKRW: number;
  LSKPLN: number;
  LSKJPY: number;
  LSKCNY: number;
  LSKAED: number;
}

export const fetchLastPrices = async (): Promise<Prices> => {
  const currency = "lisk";
  const fiatPrices = fiatPricesCacheGet();
  const USDJPY = fiatPrices.JPY;
  const USDCNY = fiatPrices.CNY;
  const USDAED = fiatPrices.AED;

  const { data } = await axios.get(
    `${process.env.MARKET_CAP_PROVIDER}${currency}?tickers=true&market_data=false&community_data=false&developer_data=false&sparkline=false
`
  );

  const LSKUSD: number =
    +data.tickers.find((t) => t.target === "USD")?.last?.toFixed(2) || -1;
  const LSKBTC: number =
    +data.tickers.find((t) => t.target === "BTC")?.last.toFixed(8) || -1;
  const LSKEUR: number =
    +data.tickers.find((t) => t.target === "EUR")?.last.toFixed(2) || -1;
  const LSKKRW: number =
    +data.tickers.find((t) => t.target === "KRW")?.last.toFixed(2) || -1;
  const LSKPLN: number =
    data.tickers.find((t) => t.target === "PLN")?.last.toFixed(2) || -1;
  const LSKJPY: number =
    +(data.tickers.find((t) => t.target === "USD")?.last * USDJPY).toFixed(2) ||
    -1;
  const LSKCNY: number =
    +(data.tickers.find((t) => t.target === "USD")?.last * USDCNY).toFixed(2) ||
    -1;
  const LSKAED: number =
    +(data.tickers.find((t) => t.target === "USD")?.last * USDAED).toFixed(2) ||
    -1;

  return {
    LSKUSD,
    LSKBTC,
    LSKEUR,
    LSKKRW,
    LSKPLN,
    LSKJPY,
    LSKCNY,
    LSKAED,
  };
};
