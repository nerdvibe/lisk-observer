import axios from "axios";
import { delegatesCacheSet, delegatesPromisesCacheSet } from "./index";
import { coreDb } from "../../../db";
import { accountsByPublicKeyCacheGetAll } from "@modules/accounts/cache/currentCache";
import { getBase32AddressFromHex } from "@modules/utils/lisk/addresses";

export const buildDelegatesCacheFromCore = async () => {
  const accounts = accountsByPublicKeyCacheGetAll();

  let offsetDelegates = 0;
  const LIMIT = 10000;
  const { data: delegatesResponse } = await axios.get(
    `${process.env.LISK_CORE_API_URL}/delegates?limit=${LIMIT}0&offset=${offsetDelegates}`
  );

  const { data: forgersResponse } = await axios.get(
    `${process.env.LISK_CORE_API_URL}/forgers?limit=103&offset=0`
  );
  let delegates = delegatesResponse.data;
  const forgers = forgersResponse.data;
  const producedBlocksRaw = await coreDb("blocks")
    .select("generatorPublicKey")
    .count("*")
    .groupBy("generatorPublicKey");
  const producedBlocks = {};

  producedBlocksRaw.forEach((block) => {
    const generatorPublicKey = block.generatorPublicKey;
    const accountString = accounts[generatorPublicKey];
    if (!accountString) {
      return;
    }
    const account = JSON.parse(accountString || "");

    producedBlocks[account.address] = block["count(*)"];
  });

  const delegatesWithConsensusPax = delegates.map((delegate) => {
    const forgerFound = forgers.find(
      (f) => f.username === delegate.dpos.delegate.username
    );
    delegate.isConsensusParticipant = !!forgerFound?.nextForgingTime || false;
    return delegate;
  });

  const activeDelegates = [];
  const inactiveDelegates = [];

  const delegatesWithSelfVotes = delegatesWithConsensusPax.map((d) => {
    const selfVotes =
      d.dpos.sentVotes?.filter((vote) => vote.delegateAddress === d.address) ||
      [];
    const selfVotesAmount = selfVotes.reduce((acc, curr) => {
      return acc + +curr.amount;
    }, 0);

    d.dpos.delegate.selfVotesAmount = selfVotesAmount || 0;

    d.dpos.delegate.consensusWeight =
      d.dpos.delegate.selfVotesAmount * 10 > d.dpos.delegate.totalVotesReceived
        ? d.dpos.delegate.totalVotesReceived
        : d.dpos.delegate.selfVotesAmount * 10;
    return d;
  });

  delegatesWithSelfVotes.forEach((delegate) =>
    delegate.isConsensusParticipant
      ? activeDelegates.push(delegate)
      : inactiveDelegates.push(delegate)
  );

  const activeDelegatesSorted = activeDelegates.sort(
    (a, b) =>
      parseFloat(b.dpos.delegate.consensusWeight) -
      parseFloat(a.dpos.delegate.consensusWeight)
  );
  const inactiveDelegatesSorted = inactiveDelegates.sort(
    (a, b) =>
      parseFloat(b.dpos.delegate.consensusWeight) -
      parseFloat(a.dpos.delegate.consensusWeight)
  );

  const delegatesSorted = [
    ...activeDelegatesSorted,
    ...inactiveDelegatesSorted,
  ];

  let bannedOffset = 0;
  const delegatesCache = delegatesSorted.map((delegate, index) => {
    const dposCurrentActivity = forgers.find(
      (forger) => forger.address === delegate.address
    );
    const address = getBase32AddressFromHex(delegate.address);

    const humanIndex = index + 1;
    if (delegate.dpos.delegate.isBanned) {
      bannedOffset = bannedOffset - 1;
    }
    delegate.dpos.delegate.rank = humanIndex;
    delegate.dpos.delegate.rankAdjusted = humanIndex + bannedOffset;
    delegate.dpos.delegate.producedBlocks = producedBlocks[address] || 0;
    delegate.dpos.delegate.minActiveHeight =
      dposCurrentActivity?.minActiveHeight || -1;
    delegate.dpos.delegate.isConsensusParticipant =
      delegate.isConsensusParticipant || false;
    delegate.dpos.delegate.nextForgingTime =
      dposCurrentActivity?.nextForgingTime || -1;
    return {
      key: address,
      val: delegate.dpos,
    };
  });

  await delegatesCacheSet(delegatesCache);
};

export const buildDelegatesPromisesCache = async () => {
  const { data } = await axios.get(`${process.env.VALIDATORS_API}`);
  await delegatesPromisesCacheSet(data.data);
};
