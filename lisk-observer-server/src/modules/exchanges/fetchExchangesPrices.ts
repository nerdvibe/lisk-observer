import axios from "axios";
import exchangeImages from "./utils/exchangeImages.json";

export const fetchExchangesPrices = async (): Promise<any> => {
  const currency = "lisk";
  const exchanges = {};

  const { data } = await axios.get(
    `${process.env.MARKET_CAP_PROVIDER}${currency}?tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false
`
  );

  data.tickers.forEach((ticker) => {
    let exchange = exchanges[ticker.market.name] || {};
    exchange[ticker.target] = ticker;
    exchanges[ticker.market.name] = exchange;
  });

  const exchangesWithTopMarkets = [];

  Object.keys(exchanges).forEach((key) => {
    const exchange = exchanges[key];

    if (Object.keys(exchange).length < 3) {
      const targets = Object.keys(exchange);
      // min aka minified exchange
      const minExchange = {};
      let volume = 0;
      const markets = targets.map((target) => {
        volume = volume + exchange[target].converted_volume.usd;
        return {
          base: exchange[target].base,
          target: exchange[target].target,
          last: exchange[target].last,
          trade_url: exchange[target].trade_url,
        };
      });
      minExchange["exchangeName"] = key;
      minExchange["volume"] = volume;
      minExchange["image"] =
        exchangeImages[key.trim()] ||
        "https://lisk.observer/assets/exchanges/unknown.png";
      minExchange["markets"] = markets;
      return exchangesWithTopMarkets.push(minExchange);
    }

    const markets = [];

    // if there are more than 3 pairs...

    const BTC = exchange.BTC || exchange.XBT || null;
    const USD = exchange.USD || exchange.USDT || exchange.BUSD || null;
    const OTHER = exchange.EUR || exchange.ETH || null;

    BTC &&
      markets.push({
        base: BTC.base,
        target: BTC.target,
        last: BTC.last,
        trade_url: BTC.trade_url,
      });
    USD &&
      markets.push({
        base: USD.base,
        target: USD.target,
        last: USD.last,
        trade_url: USD.trade_url,
      });
    OTHER &&
      markets.push({
        base: OTHER.base,
        target: OTHER.target,
        last: OTHER.last,
        trade_url: OTHER.trade_url,
      });

    const volume =
      (BTC?.converted_volume?.usd || 0) +
      (USD?.converted_volume?.usd || 0) +
      (OTHER?.converted_volume?.usd || 0);

    exchangesWithTopMarkets.push({
      exchangeName: key,
      markets,
      volume,
      image:
        exchangeImages[key.trim()] ||
        "https://lisk.observer/assets/exchanges/unknown.png",
    });
  });

  const sortedByVolume = exchangesWithTopMarkets.sort(
    (a, b) => b.volume - a.volume
  );

  return sortedByVolume;
};
