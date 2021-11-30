import {
  rebuildDelegatesCron,
  rebuildDelegatesPromisesCron,
} from "@modules/cron/delegates";
import { rebuildStatsCron } from "./transactions";
import {
  rebuildAccountsCron,
  rebuildRichListCacheCron,
} from "@modules/cron/accounts";
import {
  rebuildFiatPricesCron,
  rebuildLastTicksCron,
  rebuildPricesCron,
} from "@modules/cron/prices";
import { rebuildKnownAddressesCron } from "@modules/cron/knownAddresses";
import { rebuildHeightsCacheCron } from "@modules/cron/heights";
import { rebuildStatsCacheCron } from "@modules/cron/stats";
import { rebuildNetworkCron } from "@modules/cron/netowrk";

export const initCron = () => {
  rebuildAccountsCron.start();
  rebuildStatsCacheCron.start();
  rebuildRichListCacheCron.start();
  rebuildStatsCron.start();
  rebuildDelegatesCron.start();
  rebuildPricesCron.start();
  rebuildLastTicksCron.start();
  rebuildFiatPricesCron.start();
  rebuildKnownAddressesCron.start();
  rebuildHeightsCacheCron.start();
  rebuildDelegatesPromisesCron.start();
  rebuildNetworkCron.start();
};
