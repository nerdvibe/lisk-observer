import {
  buildDelegatesCacheFromCore,
  buildDelegatesPromisesCache,
} from "@modules/delegates/cache/buildCache";
import { logger } from "@modules/log";
import {
  buildAddressesCacheFromDB,
  buildLegacyAccountsFromDB,
  buildRichListCache,
} from "@modules/accounts/cache/buildCache";
import { buildTransactionsStatCacheFromDB } from "@modules/stats/cache/buildCache";
import { timeStart } from "@modules/utils/timeBenchmark";
import {
  buildFiatPricesCache,
  buildLastPricesCache,
  buildPricesCache,
  initEmptyFiatPricesCache,
  initEmptyLastPricesCache,
  initEmptyPricesCache,
} from "@modules/prices/cache/buildCache";
import { buildKnownAddressesCacheFromDB } from "@modules/knownAddresses/cache/buildCache";
import {
  buildFinalizedHeightCache,
  buildLastBlockCache,
} from "@modules/blocks/cache/buildCache";
import {
  buildNetworkCache,
  initEmptyNetworkCache,
} from "@modules/network/cache/buildCache";

const log = logger("CACHE_INIT");

const calculateTimeEnd = (start) => {
  const end = new Date().getTime();
  return (end - start) / 1000;
};

const buildPlaceholderCaches = () => {
  initEmptyNetworkCache();
  initEmptyFiatPricesCache();
  initEmptyPricesCache();
  initEmptyLastPricesCache();
};
export const buildCaches = async () => {
  buildPlaceholderCaches();

  log.info("Building sync caches...");

  try {
    const start = timeStart();

    await buildFinalizedHeightCache();
    await buildLastBlockCache();

    const delta = calculateTimeEnd(start);
    log.info(`buildHeightsCache completed in ${delta}s`);
  } catch (e) {
    console.log(e);
    log.error("buildHeightsCache failed");
  }

  try {
    const start = timeStart();
    await buildDelegatesCacheFromCore();
    const delta = calculateTimeEnd(start);
    log.info(`buildDelegatesCacheFromCore completed in ${delta}s`);
  } catch (e) {
    console.log(e);
    log.error("buildDelegatesCacheFromCore failed");
  }

  try {
    const start = timeStart();

    await buildTransactionsStatCacheFromDB();

    const delta = calculateTimeEnd(start);
    log.info(`buildTransactionsStatCacheFromDB completed in ${delta}s`);
  } catch (e) {
    console.log(e);
    log.error("buildTransactionsStatCacheFromDB failed");
  }

  log.info("Sync caches built. Starting parallel caches...");

  Promise.all([
    (async () => {
      try {
        const start = timeStart();

        await buildAddressesCacheFromDB();

        const delta = calculateTimeEnd(start);
        log.info(`buildAddressesCacheFromDB completed in ${delta}s`);
      } catch (e) {
        log.error("buildAddressesCacheFromDB failed");
      }
    })(),
    async () => {
      try {
        const start = timeStart();
        await buildLegacyAccountsFromDB();

        const delta = calculateTimeEnd(start);
        log.info(`buildLegacyAccountsFromDB completed in ${delta}s`);
      } catch (e) {
        console.log(e);
        log.error("buildLegacyAccountsFromDB failed");
      }
    },
    (async () => {
      try {
        const start = timeStart();

        await buildFiatPricesCache();

        const delta = calculateTimeEnd(start);
        log.info(`buildFiatPricesCache completed in ${delta}s`);
      } catch (e) {
        console.log(e);
        log.error("buildFiatPricesCache failed");
      }
    })(),
    (async () => {
      try {
        const start = timeStart();

        await buildDelegatesPromisesCache();

        const delta = calculateTimeEnd(start);
        log.info(`buildDelegatesPromisesCache completed in ${delta}s`);
      } catch (e) {
        console.log(e);
        log.error("buildDelegatesPromisesCache failed");
      }
    })(),
    (async () => {
      try {
        const start = timeStart();

        await buildPricesCache();

        const delta = calculateTimeEnd(start);
        log.info(`buildPricesCache completed in ${delta}s`);
      } catch (e) {
        console.log(e);
        log.error("buildPricesCache failed");
      }
    })(),
    (async () => {
      try {
        const start = timeStart();

        await buildLastPricesCache();

        const delta = calculateTimeEnd(start);
        log.info(`buildLastPricesCache completed in ${delta}s`);
      } catch (e) {
        console.log(e);
        log.error("buildLastPricesCache failed");
      }
    })(),
    (async () => {
      try {
        const start = timeStart();

        await buildRichListCache();

        const delta = calculateTimeEnd(start);
        log.info(`buildRichListCache completed in ${delta}s`);
      } catch (e) {
        log.error("buildRichListCache failed");
      }
    })(),
    (async () => {
      try {
        const start = timeStart();

        await buildKnownAddressesCacheFromDB();

        const delta = calculateTimeEnd(start);
        log.info(`buildKnownAddressesCacheFromDB completed in ${delta}s`);
      } catch (e) {
        console.log(e);
        log.error("buildKnownAddressesCacheFromDB failed");
      }
    })(),
    (async () => {
      try {
        const start = timeStart();

        await buildNetworkCache();

        const delta = calculateTimeEnd(start);
        log.info(`buildNetworkCache completed in ${delta}s`);
      } catch (e) {
        console.log(e);
        log.error("buildNetworkCache failed");
      }
    })(),
  ]);

  log.info("Boot caches built.");
};
