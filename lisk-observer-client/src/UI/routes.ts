import React from "react";

import { BlockchainOverview } from "../modules/blockchainOverview/BlockchainOverview";
import { Transactions } from "../modules/transactions/Transactions";
import { Blocks } from "../modules/blocks/Blocks";
import { LastVotes } from "../modules/network/LastVotes";
import { DelegatesList } from "../modules/delegates/DelegatesList";
import { LastMessages } from "../modules/messages/LastMessages";
import { KnownAddresses } from "../modules/knownAddresses/KnownAddresses";
import { Analytics } from "../modules/analytics/Analytics";
import { RichList } from "../modules/richList/RichList";
import { NetworkOverview } from "../modules/network-overview/NetworkOverview";

export interface Routes {
  path: string;
  name: string;
  icon: string;
  component: React.FC;
  layout: string;
  home?: boolean;
  exact?: boolean;
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
    path: "/transactions",
    name: "Transactions",
    icon: "exchange-alt",
    component: Transactions,
    layout: "",
  },
  {
    path: "/blocks",
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
    path: "/rich-list",
    name: "Rich list",
    icon: "gem",
    component: RichList,
    layout: "",
  },
];
