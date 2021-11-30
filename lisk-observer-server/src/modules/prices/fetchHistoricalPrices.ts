import axios from "axios";
import { SUPPORTED_CURRENCIES } from "@modules/prices/const";
import { fiatPricesCacheGet } from "@modules/prices/cache";

const formatDate = (value: number) => {
  let date = new Date(value);
  const day = date.toLocaleString("default", { day: "2-digit" });
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.toLocaleString("default", { year: "numeric" });
  return `${day}-${month}-${year}`;
};

interface Prices {
  currency: string;
  date: string[];
  value: string[];
}

export const fetchHistoricalPrices = async (): Promise<Prices[]> => {
  const currency = "lisk";
  const usd = "usd";
  const btc = "btc";
  const eur = "eur";
  const pln = "pln";
  const krw = "krw";
  const fiatPrices = await fiatPricesCacheGet();
  const USDJPY = fiatPrices.JPY;
  const USDCNY = fiatPrices.CNY;
  const USDAED = fiatPrices.AED;
  const USDPLN = fiatPrices.PLN;

  const [
    { data: lskUsd },
    { data: lskBtc },
    { data: lskEur },
    { data: lskKrw },
  ] = await Promise.all([
    axios.get(
      `${process.env.MARKET_CAP_PROVIDER}${currency}/market_chart?vs_currency=${usd}&days=30&interval=daily`
    ),
    axios.get(
      `${process.env.MARKET_CAP_PROVIDER}${currency}/market_chart?vs_currency=${btc}&days=30&interval=daily`
    ),
    axios.get(
      `${process.env.MARKET_CAP_PROVIDER}${currency}/market_chart?vs_currency=${eur}&days=30&interval=daily`
    ),
    axios.get(
      `${process.env.MARKET_CAP_PROVIDER}${currency}/market_chart?vs_currency=${krw}&days=30&interval=daily`
    ),
  ]);

  return [
    {
      currency: SUPPORTED_CURRENCIES.LSKUSD,
      date: lskUsd.prices.map((p) => formatDate(p[0])),
      value: lskUsd.prices.map((p) => p[1].toFixed(2)),
    },
    {
      currency: SUPPORTED_CURRENCIES.LSKBTC,
      date: lskBtc.prices.map((p) => formatDate(p[0])),
      value: lskBtc.prices.map((p) => p[1].toFixed(8)),
    },
    {
      currency: SUPPORTED_CURRENCIES.LSKEUR,
      date: lskEur.prices.map((p) => formatDate(p[0])),
      value: lskEur.prices.map((p) => p[1].toFixed(2)),
    },
    {
      currency: SUPPORTED_CURRENCIES.LSKKRW,
      date: lskKrw.prices.map((p) => formatDate(p[0])),
      value: lskKrw.prices.map((p) => p[1].toFixed(2)),
    },
    {
      currency: SUPPORTED_CURRENCIES.LSKPLN,
      date: lskUsd.prices.map((p) => formatDate(p[0])),
      // PLN Chart is not available, defaulting to USDPLN
      value: lskUsd.prices.map((p) => (p[1] * USDPLN).toFixed(2)),
    },
    {
      currency: SUPPORTED_CURRENCIES.LSKJPY,
      date: lskUsd.prices.map((p) => formatDate(p[0])),
      value: lskUsd.prices.map((p) => (p[1] * USDJPY).toFixed(2)),
    },
    {
      currency: SUPPORTED_CURRENCIES.LSKCNY,
      date: lskUsd.prices.map((p) => formatDate(p[0])),
      value: lskUsd.prices.map((p) => (p[1] * USDCNY).toFixed(2)),
    },
    {
      currency: SUPPORTED_CURRENCIES.LSKAED,
      date: lskUsd.prices.map((p) => formatDate(p[0])),
      value: lskUsd.prices.map((p) => (p[1] * USDAED).toFixed(2)),
    },
  ];
};
