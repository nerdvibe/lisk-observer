import React from "react";
import { AvatarSize } from "./DelegateLogo";

interface DelegateLogosDictionary {
  [key: string]: {
    img: string;
  };
}
interface DelegateLogo {
  identifier: string;
  className?: string;
  address?: string;
  style?: any;
  size?: AvatarSize;
}
const delegateLogosDictionary: DelegateLogosDictionary = {
  binance: {
    img: require("./exchangeLogos/binance.jpg"),
  },
  bitbay: {
    img: require("./exchangeLogos/bitbay.jpg"),
  },
  bitbns: {
    img: require("./exchangeLogos/bitbns.png"),
  },
  bitflyer: {
    img: require("./exchangeLogos/bitflyer.jpg"),
  },
  bitpanda: {
    img: require("./exchangeLogos/bitpanda.png"),
  },
  bittrex: {
    img: require("./exchangeLogos/bittrex.png"),
  },
  changelly: {
    img: require("./exchangeLogos/changelly.jpg"),
  },
  changer: {
    img: require("./exchangeLogos/changer.png"),
  },
  chaoex: {
    img: require("./exchangeLogos/chaoex.jpg"),
  },
  coincheck: {
    img: require("./exchangeLogos/coincheck.jpg"),
  },
  coinex: {
    img: require("./exchangeLogos/coinex.jpg"),
  },
  coinspot: {
    img: require("./exchangeLogos/coinspot.png"),
  },
  coss: {
    img: require("./exchangeLogos/coss.png"),
  },
  exmo: {
    img: require("./exchangeLogos/exmo.jpg"),
  },
  hitbtc: {
    img: require("./exchangeLogos/hitbtc.jpg"),
  },
  kraken: {
    img: require("./exchangeLogos/kraken.jpg"),
  },
  kucoin: {
    img: require("./exchangeLogos/kucoin.png"),
  },
  livecoin: {
    img: require("./exchangeLogos/livecoin.jpg"),
  },
  poloniex: {
    img: require("./exchangeLogos/poloniex.jpg"),
  },
  yobit: {
    img: require("./exchangeLogos/yobit.jpg"),
  },
};

export const ExchangeLogo = ({
  identifier,
  className,
  address,
  style,
  size,
}: DelegateLogo) => {
  const image = delegateLogosDictionary[identifier]
    ? delegateLogosDictionary[identifier].img
    : `https://avatars.lisk.observer/${address}`;
  return (
    <img
      src={image}
      style={style}
      alt="avatar"
      className={`${className} ${size ? size : ""}`}
    />
  );
};
