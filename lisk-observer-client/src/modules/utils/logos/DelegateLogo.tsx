import React from "react";
import "./style.css";

interface DelegateLogosDictionary {
  [key: string]: {
    img: string;
  };
}
interface DelegateLogo {
  delegateName: string;
  className?: string;
  address?: string;
  generateRandom?: boolean;
  style?: any;
  size?: AvatarSize;
}

export enum AvatarSize {
  SMALL = "avatar-small",
  MEDIUM = "avatar-medium",
  BIG = "avatar-big",
}

const delegateLogosDictionary: DelegateLogosDictionary = {
  carbonara: {
    img: require("./delegateLogos/carbonara.jpg"),
  },
  anamix: {
    img: require("./delegateLogos/anamix.png"),
  },
  benevale: {
    img: require("./delegateLogos/benevale.png"),
  },
  blainemono: {
    img: require("./delegateLogos/blainemono.png"),
  },
  eddedw: {
    img: require("./delegateLogos/eddedw.png"),
  },
  gregorst: {
    img: require("./delegateLogos/gregorst.jpeg"),
  },
  helpinghand: {
    img: require("./delegateLogos/helpinghand.jpeg"),
  },
  irina18: {
    img: require("./delegateLogos/irina18.png"),
  },
  jesusthehun: {
    img: require("./delegateLogos/jesusthehun.png"),
  },
  kc: {
    img: require("./delegateLogos/kc.png"),
  },
  liskearn: {
    img: require("./delegateLogos/liskearn.png"),
  },
  phinx: {
    img: require("./delegateLogos/phinx.jpg"),
  },
  pool80percent: {
    img: require("./delegateLogos/pool80percent.jpg"),
  },
  privatepool: {
    img: require("./delegateLogos/privatepool.png"),
  },
  spaceonepool: {
    img: require("./delegateLogos/spaceonepool.jpg"),
  },
  ultrafresh: {
    img: require("./delegateLogos/ultrafresh.png"),
  },
  tonyt908: {
    img: require("./delegateLogos/tonyt908.jpg"),
  },
  liskmagazine: {
    img: require("./delegateLogos/liskmagazine.jpg"),
  },
  przemer: {
    img: require("./delegateLogos/przemer.jpg"),
  },
  chamberlain: {
    img: require("./delegateLogos/chamberlain.jpg"),
  },
  jong: {
    img: require("./delegateLogos/jong.jpg"),
  },
  gym: {
    img: require("./delegateLogos/gym.png"),
  },
  moosty: {
    img: require("./delegateLogos/moosty.jpg"),
  },
  stellardynamic: {
    img: require("./delegateLogos/stellardynamic.jpg"),
  },
  alepop: {
    img: require("./delegateLogos/alepop.jpg"),
  },
  cc001: {
    img: require("./delegateLogos/cc001.jpg"),
  },
  endro: {
    img: require("./delegateLogos/endro.jpg"),
  },
  forger_of_lisk: {
    img: require("./delegateLogos/forger_of_lisk.jpg"),
  },
  korben3: {
    img: require("./delegateLogos/korben3.jpg"),
  },
  lemii: {
    img: require("./delegateLogos/lemii.jpg"),
  },
  "liskpoland.pl": {
    img: require("./delegateLogos/liskpolandpl.jpg"),
  },
  minions: {
    img: require("./delegateLogos/minions.jpg"),
  },
  mrv: {
    img: require("./delegateLogos/mrv.jpg"),
  },
  samuray: {
    img: require("./delegateLogos/samuray.jpg"),
  },
  seven: {
    img: require("./delegateLogos/seven.jpg"),
  },
  spacetrucker: {
    img: require("./delegateLogos/spacetrucker.jpg"),
  },
  splatters: {
    img: require("./delegateLogos/splatters.jpg"),
  },
  thamar: {
    img: require("./delegateLogos/thamar.jpg"),
  },
  punkrock: {
    img: require("./delegateLogos/punkrock.png"),
  },
  ondin: {
    img: require("./delegateLogos/ondin.png"),
  },
};

export const DelegateLogo = ({
  delegateName,
  className,
  address,
  style,
  size,
}: DelegateLogo) => {
  const image = delegateLogosDictionary[delegateName]
    ? delegateLogosDictionary[delegateName].img
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
