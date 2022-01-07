import React from "react";
const BlockchainOverview = React.lazy(() =>
  import("../modules/blockchainOverview/BlockchainOverview")
);
const Transactions = React.lazy(() =>
  import("../modules/transactions/Transactions")
);
const Blocks = React.lazy(() => import("../modules/blocks/Blocks"));
const LastVotes = React.lazy(() => import("../modules/network/LastVotes"));
const DelegatesList = React.lazy(() =>
  import("../modules/delegates/DelegatesList")
);
const LastMessages = React.lazy(() =>
  import("../modules/messages/LastMessages")
);
const KnownAddresses = React.lazy(() =>
  import("../modules/knownAddresses/KnownAddresses")
);
const Analytics = React.lazy(() => import("../modules/analytics/Analytics"));
const RichList = React.lazy(() => import("../modules/richList/RichList"));
const NetworkOverview = React.lazy(() =>
  import("../modules/network-overview/NetworkOverview")
);
const WhalesList = React.lazy(() => import("../modules/whalesList/WhalesList"));

export interface Routes {
  path: string;
  name: string;
  icon: string;
  component: React.FC;
  layout: string;
  home?: boolean;
  exact?: boolean;
  link?: string;
}

export const routes: Routes[] = [
  {
    path: "/",
    name: "Overview",
    icon: "binoculars",
    component: BlockchainOverview,
    layout: "",
    home: true,
    exact: true,
  },
  {
    path: "/transactions/:page?",
    link: "/transactions",
    name: "Transactions",
    icon: "exchange-alt",
    component: Transactions,
    layout: "",
  },
  {
    path: "/blocks/:page?",
    link: "/blocks",
    name: "Blocks",
    icon: "cube",
    component: Blocks,
    layout: "",
  },
  {
    path: "/network",
    name: "Network",
    icon: "globe-europe",
    component: NetworkOverview,
    layout: "",
  },
  {
    path: "/votes",
    name: "Votes",
    icon: "stream",
    component: LastVotes,
    layout: "",
  },
  {
    path: "/last-messages",
    name: "Eternity Wall",
    icon: "envelope-open-text",
    component: LastMessages,
    layout: "",
  },
  {
    path: "/known-addresses",
    name: "Known Addresses",
    icon: "fingerprint",
    component: KnownAddresses,
    layout: "",
  },
  {
    path: "/delegates",
    name: "Delegates",
    icon: "user",
    component: DelegatesList,
    layout: "",
  },
  {
    path: "/analytics",
    name: "Analytics",
    icon: "chart-bar",
    component: Analytics,
    layout: "",
  },
  {
    path: "/rich-list/:page?",
    link: "/rich-list",
    name: "Rich list",
    icon: "gem",
    component: RichList,
    layout: "",
  },
  {
    path: "/whale-transactions/:page?",
    link: "/whale-transactions",
    name: "Whale transactions",
    icon: "money-bill-wave",
    component: WhalesList,
    layout: "",
  },
];
