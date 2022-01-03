import { GraphQLResolveInfo } from "graphql";
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Account = {
  __typename?: "Account";
  username?: Maybe<Scalars["String"]>;
  address?: Maybe<Scalars["String"]>;
  isDelegate?: Maybe<Scalars["Boolean"]>;
  token?: Maybe<Token>;
  sequence?: Maybe<Sequence>;
  keys?: Maybe<Keys>;
  dpos?: Maybe<Dpos>;
  hexAddress?: Maybe<Scalars["String"]>;
  publicKey?: Maybe<Scalars["String"]>;
};

export type AccountDelegate = {
  __typename?: "AccountDelegate";
  address?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
  dpos?: Maybe<Dpos>;
};

export type AccountSearch = {
  __typename?: "AccountSearch";
  username?: Maybe<Scalars["String"]>;
  address?: Maybe<Scalars["String"]>;
};

export type Block = {
  __typename?: "Block";
  id: Scalars["String"];
  height: Scalars["String"];
  timestamp: Scalars["String"];
  generatorPublicKey?: Maybe<Scalars["String"]>;
  reward?: Maybe<Scalars["String"]>;
  isFinal?: Maybe<Scalars["Boolean"]>;
  username?: Maybe<Scalars["String"]>;
  address?: Maybe<Scalars["String"]>;
  finalized?: Maybe<Scalars["String"]>;
};

export type BlockLegacy = {
  __typename?: "BlockLegacy";
  isLegacy?: Maybe<Scalars["Boolean"]>;
  height?: Maybe<Scalars["Int"]>;
  id?: Maybe<Scalars["String"]>;
  timestamp?: Maybe<Scalars["String"]>;
  numberOfTransactions?: Maybe<Scalars["Int"]>;
  totalAmount?: Maybe<Scalars["String"]>;
  totalFee?: Maybe<Scalars["String"]>;
  reward?: Maybe<Scalars["String"]>;
  generatorPublicKey?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
  address?: Maybe<Scalars["String"]>;
};

export type BlockLegacyForTransactions = {
  __typename?: "BlockLegacyForTransactions";
  isLegacy?: Maybe<Scalars["Boolean"]>;
  height?: Maybe<Scalars["Int"]>;
  id?: Maybe<Scalars["String"]>;
  timestamp?: Maybe<Scalars["String"]>;
  numberOfTransactions?: Maybe<Scalars["Int"]>;
  totalAmount?: Maybe<Scalars["String"]>;
  totalFee?: Maybe<Scalars["String"]>;
  reward?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
  address?: Maybe<Scalars["String"]>;
  generatorPublicKey?: Maybe<Scalars["String"]>;
};

export type BlockSearch = {
  __typename?: "BlockSearch";
  id?: Maybe<Scalars["String"]>;
  height?: Maybe<Scalars["String"]>;
};

export type BlockTransactionsOrLegacy = BlockWithTransactions | BlockLegacy;

export type BlockWithTransactions = {
  __typename?: "BlockWithTransactions";
  block?: Maybe<Block>;
  transactions?: Maybe<Array<Maybe<Transaction>>>;
};

export type Countries = {
  __typename?: "Countries";
  country?: Maybe<Scalars["String"]>;
  count?: Maybe<Scalars["Int"]>;
};

export enum Currencies {
  Lskusd = "LSKUSD",
  Lskbtc = "LSKBTC",
  Lskeur = "LSKEUR",
  Lskkrw = "LSKKRW",
  Lskpln = "LSKPLN",
  Lskjpy = "LSKJPY",
  Lskcny = "LSKCNY",
  Lskaed = "LSKAED",
}

export type CurrencyData = {
  __typename?: "CurrencyData";
  currency?: Maybe<Currencies>;
  date?: Maybe<Array<Maybe<Scalars["String"]>>>;
  value?: Maybe<Array<Maybe<Scalars["Float"]>>>;
};

export type Delegate = {
  __typename?: "Delegate";
  username?: Maybe<Scalars["String"]>;
  pomHeights?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  consecutiveMissedBlocks?: Maybe<Scalars["Int"]>;
  lastForgedHeight?: Maybe<Scalars["Int"]>;
  isBanned?: Maybe<Scalars["Boolean"]>;
  totalVotesReceived?: Maybe<Scalars["String"]>;
  selfVotesAmount?: Maybe<Scalars["Float"]>;
  rankAdjusted?: Maybe<Scalars["Int"]>;
  isConsensusParticipant?: Maybe<Scalars["Boolean"]>;
  minActiveHeight?: Maybe<Scalars["Int"]>;
  nextForgingTime?: Maybe<Scalars["Int"]>;
  producedBlocks?: Maybe<Scalars["Int"]>;
  rank?: Maybe<Scalars["Int"]>;
  consensusWeight?: Maybe<Scalars["String"]>;
};

export type DelegatesList = {
  __typename?: "DelegatesList";
  delegates?: Maybe<Array<Maybe<AccountDelegate>>>;
  total?: Maybe<Scalars["Int"]>;
};

export type DelegatesWithStats = {
  __typename?: "DelegatesWithStats";
  locked?: Maybe<Scalars["String"]>;
  supply?: Maybe<Scalars["String"]>;
  delegates?: Maybe<DelegatesList>;
  promises?: Maybe<Array<Maybe<Promises>>>;
};

export type Dpos = {
  __typename?: "Dpos";
  delegate?: Maybe<Delegate>;
  sentVotes?: Maybe<Array<Maybe<SentVotes>>>;
  receivedVotes?: Maybe<Array<Maybe<ReceivedVotes>>>;
  unlocking?: Maybe<Array<Maybe<Unlocking>>>;
};

export type EthernityWallMessage = {
  __typename?: "EthernityWallMessage";
  id: Scalars["String"];
  moduleAssetId: Scalars["String"];
  timestamp: Scalars["String"];
  senderId?: Maybe<Scalars["String"]>;
  amount?: Maybe<Scalars["String"]>;
  data?: Maybe<Scalars["String"]>;
  senderUsername?: Maybe<Scalars["String"]>;
};

export type Keys = {
  __typename?: "Keys";
  numberOfSignatures?: Maybe<Scalars["String"]>;
  mandatoryKeys?: Maybe<Array<Maybe<Scalars["String"]>>>;
  optionalKeys?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type KnownAddresses = {
  __typename?: "KnownAddresses";
  address?: Maybe<Scalars["String"]>;
  identifier?: Maybe<Scalars["String"]>;
  isExchange?: Maybe<Scalars["Boolean"]>;
  isLiskHq?: Maybe<Scalars["Boolean"]>;
  isScam?: Maybe<Scalars["Boolean"]>;
  tag?: Maybe<Scalars["String"]>;
  balance?: Maybe<Scalars["String"]>;
};

export type LastTicks = {
  __typename?: "LastTicks";
  LSKUSD?: Maybe<Scalars["Float"]>;
  LSKBTC?: Maybe<Scalars["Float"]>;
  LSKEUR?: Maybe<Scalars["Float"]>;
  LSKKRW?: Maybe<Scalars["Float"]>;
  LSKPLN?: Maybe<Scalars["Float"]>;
  LSKJPY?: Maybe<Scalars["Float"]>;
  LSKCNY?: Maybe<Scalars["Float"]>;
  LSKAED?: Maybe<Scalars["Float"]>;
};

export type LegacyAccount = {
  __typename?: "LegacyAccount";
  username?: Maybe<Scalars["String"]>;
  address?: Maybe<Scalars["String"]>;
  balance?: Maybe<Scalars["String"]>;
  publicKey?: Maybe<Scalars["String"]>;
};

export type MultisigRegistration = {
  __typename?: "MultisigRegistration";
  numberOfSignatures?: Maybe<Scalars["Int"]>;
  mandatoryKeys?: Maybe<Array<Maybe<Scalars["String"]>>>;
  optionalKeys?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type NetworkInfo = {
  __typename?: "NetworkInfo";
  stats?: Maybe<NetworkPeersStat>;
  peers?: Maybe<Array<Maybe<Peers>>>;
  countries?: Maybe<Array<Maybe<Countries>>>;
};

export type NetworkPeersStat = {
  __typename?: "NetworkPeersStat";
  totalPeers?: Maybe<Scalars["Int"]>;
  connectedPeers?: Maybe<Scalars["Int"]>;
  disconnectedPeers?: Maybe<Scalars["Int"]>;
  networkVersionDominant?: Maybe<Scalars["String"]>;
  networkVersion?: Maybe<Array<Maybe<NetworkVersion>>>;
};

export type NetworkVersion = {
  __typename?: "NetworkVersion";
  version?: Maybe<Scalars["String"]>;
  peers?: Maybe<Scalars["Int"]>;
};

export type NodeInfo = {
  __typename?: "NodeInfo";
  name?: Maybe<Scalars["String"]>;
};

export type PaginatedBlock = {
  __typename?: "PaginatedBlock";
  data?: Maybe<Array<Maybe<Block>>>;
  pagination?: Maybe<Pagination>;
};

export type PaginatedEthernityWallMessage = {
  __typename?: "PaginatedEthernityWallMessage";
  data?: Maybe<Array<Maybe<EthernityWallMessage>>>;
  pagination?: Maybe<Pagination>;
};

export type PaginatedRichListAccount = {
  __typename?: "PaginatedRichListAccount";
  data?: Maybe<Array<Maybe<RichListAccount>>>;
  pagination?: Maybe<Pagination>;
};

export type PaginatedTransaction = {
  __typename?: "PaginatedTransaction";
  data?: Maybe<Array<Maybe<Transaction>>>;
  pagination?: Maybe<Pagination>;
};

export type PaginatedTransactionLegacy = {
  __typename?: "PaginatedTransactionLegacy";
  data?: Maybe<Array<Maybe<TransactionLegacy>>>;
  pagination?: Maybe<Pagination>;
};

export type PaginatedTransactionOrLegacy =
  | PaginatedTransaction
  | PaginatedTransactionLegacy;

export type PaginatedVotes = {
  __typename?: "PaginatedVotes";
  data?: Maybe<Array<Maybe<Vote>>>;
  pagination?: Maybe<Pagination>;
};

export type Pagination = {
  __typename?: "Pagination";
  total?: Maybe<Scalars["Int"]>;
  lastPage?: Maybe<Scalars["Int"]>;
  currentPage?: Maybe<Scalars["Int"]>;
  perPage?: Maybe<Scalars["Int"]>;
  from?: Maybe<Scalars["Int"]>;
  to?: Maybe<Scalars["Int"]>;
};

export type Peers = {
  __typename?: "Peers";
  connected?: Maybe<Scalars["Boolean"]>;
  ipAddress?: Maybe<Scalars["String"]>;
  peerId?: Maybe<Scalars["String"]>;
  networkVersion?: Maybe<Scalars["String"]>;
  height?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
};

export type PomData = {
  __typename?: "PomData";
  address?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
};

export type Promises = {
  __typename?: "Promises";
  username?: Maybe<Scalars["String"]>;
  averageShared?: Maybe<Scalars["Float"]>;
  address?: Maybe<Scalars["String"]>;
  promisedShare?: Maybe<Scalars["Float"]>;
};

export type Query = {
  __typename?: "Query";
  block?: Maybe<BlockTransactionsOrLegacy>;
  lastBlock?: Maybe<Block>;
  lastBlocks?: Maybe<PaginatedBlock>;
  blocksByAddress?: Maybe<PaginatedBlock>;
  account?: Maybe<Account>;
  accountLegacy?: Maybe<LegacyAccount>;
  richList?: Maybe<RichList>;
  transactionsByAddress?: Maybe<PaginatedTransactionOrLegacy>;
  transaction?: Maybe<TransactionWithBlockOrLegacy>;
  transactions?: Maybe<PaginatedTransaction>;
  eternityWall?: Maybe<PaginatedEthernityWallMessage>;
  txStats?: Maybe<TxStats>;
  whaleTransactions?: Maybe<PaginatedTransaction>;
  delegates?: Maybe<DelegatesWithStats>;
  liskVoteStats?: Maybe<DelegatesWithStats>;
  nodeInfo?: Maybe<NodeInfo>;
  search?: Maybe<Search>;
  getHistoricalPrices?: Maybe<CurrencyData>;
  lastTicks?: Maybe<LastTicks>;
  votes?: Maybe<PaginatedVotes>;
  knownAddresses?: Maybe<Array<Maybe<KnownAddresses>>>;
  stats?: Maybe<Stats>;
  networkInfo?: Maybe<NetworkInfo>;
};

export type QueryBlockArgs = {
  id?: Maybe<Scalars["String"]>;
};

export type QueryLastBlocksArgs = {
  page?: Maybe<Scalars["Int"]>;
};

export type QueryBlocksByAddressArgs = {
  address: Scalars["String"];
  page?: Maybe<Scalars["Int"]>;
};

export type QueryAccountArgs = {
  address: Scalars["String"];
};

export type QueryAccountLegacyArgs = {
  address: Scalars["String"];
};

export type QueryRichListArgs = {
  page?: Maybe<Scalars["Int"]>;
};

export type QueryTransactionsByAddressArgs = {
  address: Scalars["String"];
  page: Scalars["Int"];
};

export type QueryTransactionArgs = {
  id: Scalars["String"];
};

export type QueryTransactionsArgs = {
  page?: Maybe<Scalars["Int"]>;
  TXType?: Maybe<Scalars["String"]>;
};

export type QueryEternityWallArgs = {
  page?: Maybe<Scalars["Int"]>;
};

export type QueryWhaleTransactionsArgs = {
  page: Scalars["Int"];
};

export type QuerySearchArgs = {
  term: Scalars["String"];
};

export type QueryGetHistoricalPricesArgs = {
  currency?: Maybe<Scalars["String"]>;
};

export type QueryVotesArgs = {
  page: Scalars["Int"];
};

export type ReceivedVotes = {
  __typename?: "ReceivedVotes";
  sender?: Maybe<Scalars["String"]>;
  senderUsername?: Maybe<Scalars["String"]>;
  amount?: Maybe<Scalars["String"]>;
};

export type RichList = {
  __typename?: "RichList";
  accounts?: Maybe<PaginatedRichListAccount>;
  supply?: Maybe<Scalars["Int"]>;
};

export type RichListAccount = {
  __typename?: "RichListAccount";
  address?: Maybe<Scalars["String"]>;
  balance?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
  unlocked?: Maybe<Scalars["String"]>;
};

export type Search = {
  __typename?: "Search";
  accounts?: Maybe<Array<Maybe<AccountSearch>>>;
  transactions?: Maybe<Array<Maybe<TransactionSearch>>>;
  blocks?: Maybe<Array<Maybe<BlockSearch>>>;
};

export type SentVotes = {
  __typename?: "SentVotes";
  delegateAddress?: Maybe<Scalars["String"]>;
  delegateUsername?: Maybe<Scalars["String"]>;
  amount?: Maybe<Scalars["String"]>;
};

export type Sequence = {
  __typename?: "Sequence";
  nonce?: Maybe<Scalars["String"]>;
};

export type StatElement = {
  __typename?: "StatElement";
  date?: Maybe<Scalars["String"]>;
  count?: Maybe<Scalars["Int"]>;
  volume?: Maybe<Scalars["Float"]>;
};

export type StatKind = {
  __typename?: "StatKind";
  historicalTXs?: Maybe<Array<Maybe<StatElement>>>;
  totalCount?: Maybe<Scalars["Int"]>;
  totalVolume?: Maybe<Scalars["Float"]>;
  txKinds?: Maybe<TxKinds>;
};

export type Stats = {
  __typename?: "Stats";
  last24TXs?: Maybe<Scalars["Int"]>;
  blocks?: Maybe<Scalars["Int"]>;
  staked?: Maybe<Scalars["String"]>;
  supply?: Maybe<Scalars["Int"]>;
  totalTransactions?: Maybe<Scalars["String"]>;
  totalTransactions30?: Maybe<Scalars["String"]>;
  lastDay?: Maybe<StatKind>;
  lastMonth?: Maybe<StatKind>;
  lastYear?: Maybe<StatKind>;
};

export type TxStats = {
  __typename?: "TXStats";
  lastDay?: Maybe<Scalars["Int"]>;
};

export type Token = {
  __typename?: "Token";
  balance?: Maybe<Scalars["String"]>;
  locked?: Maybe<Scalars["String"]>;
};

export type TokenUnlock = {
  __typename?: "TokenUnlock";
  delegateAddress?: Maybe<Scalars["String"]>;
  amount?: Maybe<Scalars["String"]>;
  unvoteHeight?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
};

export type Transaction = {
  __typename?: "Transaction";
  id: Scalars["String"];
  height: Scalars["String"];
  moduleAssetId: Scalars["String"];
  nonce: Scalars["String"];
  blockId: Scalars["String"];
  timestamp: Scalars["String"];
  senderPublicKey?: Maybe<Scalars["String"]>;
  senderId?: Maybe<Scalars["String"]>;
  recipientId?: Maybe<Scalars["String"]>;
  amount?: Maybe<Scalars["String"]>;
  data?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["String"]>;
  fee?: Maybe<Scalars["String"]>;
  minFee?: Maybe<Scalars["String"]>;
  senderUsername?: Maybe<Scalars["String"]>;
  recipientUsername?: Maybe<Scalars["String"]>;
  votes?: Maybe<Array<Maybe<Vote>>>;
  voteAmount?: Maybe<Scalars["String"]>;
  isFinalized?: Maybe<Scalars["Boolean"]>;
};

export type TransactionLegacy = {
  __typename?: "TransactionLegacy";
  isLegacy?: Maybe<Scalars["Boolean"]>;
  id: Scalars["String"];
  blockId?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["Int"]>;
  timestamp?: Maybe<Scalars["Int"]>;
  senderPublicKey?: Maybe<Scalars["String"]>;
  senderId?: Maybe<Scalars["String"]>;
  recipientId?: Maybe<Scalars["String"]>;
  amount?: Maybe<Scalars["String"]>;
  fee?: Maybe<Scalars["String"]>;
  signatures?: Maybe<Scalars["String"]>;
  data?: Maybe<Scalars["String"]>;
  asset?: Maybe<Scalars["String"]>;
  senderUsername?: Maybe<Scalars["String"]>;
  recipientUsername?: Maybe<Scalars["String"]>;
};

export type TransactionSearch = {
  __typename?: "TransactionSearch";
  id?: Maybe<Scalars["String"]>;
};

export type TransactionWithBlock = {
  __typename?: "TransactionWithBlock";
  id: Scalars["String"];
  height: Scalars["String"];
  moduleAssetId: Scalars["String"];
  nonce: Scalars["String"];
  blockId: Scalars["String"];
  timestamp: Scalars["String"];
  senderPublicKey?: Maybe<Scalars["String"]>;
  senderId?: Maybe<Scalars["String"]>;
  recipientId?: Maybe<Scalars["String"]>;
  amount?: Maybe<Scalars["String"]>;
  data?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["String"]>;
  fee?: Maybe<Scalars["String"]>;
  isFinalized?: Maybe<Scalars["Boolean"]>;
  senderUsername?: Maybe<Scalars["String"]>;
  recipientUsername?: Maybe<Scalars["String"]>;
  blockHeight?: Maybe<Scalars["String"]>;
  blockTimestamp: Scalars["String"];
  blockGeneratorPublicKey: Scalars["String"];
  blockIsFinal: Scalars["String"];
  blockUsername: Scalars["String"];
  blockAddress?: Maybe<Scalars["String"]>;
  votes?: Maybe<Array<Maybe<Vote>>>;
  multisigRegistration?: Maybe<MultisigRegistration>;
  tokenUnlock?: Maybe<Array<Maybe<TokenUnlock>>>;
  pomData?: Maybe<PomData>;
};

export type TransactionWithBlockLegacy = {
  __typename?: "TransactionWithBlockLegacy";
  transaction?: Maybe<TransactionLegacy>;
  block?: Maybe<BlockLegacyForTransactions>;
};

export type TransactionWithBlockOrLegacy =
  | TransactionWithBlock
  | TransactionWithBlockLegacy;

export type TxKinds = {
  __typename?: "TxKinds";
  transfers?: Maybe<Scalars["Int"]>;
  votes?: Maybe<Scalars["Int"]>;
  poms?: Maybe<Scalars["Int"]>;
  registerDelegate?: Maybe<Scalars["Int"]>;
  unlockToken?: Maybe<Scalars["Int"]>;
};

export type Unlocking = {
  __typename?: "Unlocking";
  delegateAddress?: Maybe<Scalars["String"]>;
  amount?: Maybe<Scalars["String"]>;
  unvoteHeight?: Maybe<Scalars["String"]>;
  delegateUsername?: Maybe<Scalars["String"]>;
};

export type Vote = {
  __typename?: "Vote";
  delegateAddress?: Maybe<Scalars["String"]>;
  delegateUsername?: Maybe<Scalars["String"]>;
  amount: Scalars["String"];
  id: Scalars["String"];
  sentAddress: Scalars["String"];
  receivedAddress: Scalars["String"];
  timestamp: Scalars["String"];
  senderUsername?: Maybe<Scalars["String"]>;
  recipientUsername?: Maybe<Scalars["String"]>;
};

export type AccountInfoQueryVariables = Exact<{
  addressContext: Scalars["String"];
}>;

export type AccountInfoQuery = { __typename?: "Query" } & {
  account?: Maybe<
    { __typename?: "Account" } & Pick<
      Account,
      "username" | "address" | "isDelegate" | "hexAddress" | "publicKey"
    > & {
        token?: Maybe<
          { __typename?: "Token" } & Pick<Token, "balance" | "locked">
        >;
        sequence?: Maybe<{ __typename?: "Sequence" } & Pick<Sequence, "nonce">>;
        keys?: Maybe<
          { __typename?: "Keys" } & Pick<
            Keys,
            "optionalKeys" | "mandatoryKeys" | "numberOfSignatures"
          >
        >;
        dpos?: Maybe<
          { __typename?: "Dpos" } & {
            delegate?: Maybe<
              { __typename?: "Delegate" } & Pick<
                Delegate,
                | "username"
                | "pomHeights"
                | "consecutiveMissedBlocks"
                | "lastForgedHeight"
                | "isBanned"
                | "totalVotesReceived"
                | "selfVotesAmount"
                | "rankAdjusted"
                | "isConsensusParticipant"
                | "minActiveHeight"
                | "nextForgingTime"
                | "producedBlocks"
                | "rank"
              >
            >;
            sentVotes?: Maybe<
              Array<
                Maybe<
                  { __typename?: "SentVotes" } & Pick<
                    SentVotes,
                    "delegateAddress" | "delegateUsername" | "amount"
                  >
                >
              >
            >;
            receivedVotes?: Maybe<
              Array<
                Maybe<
                  { __typename?: "ReceivedVotes" } & Pick<
                    ReceivedVotes,
                    "sender" | "senderUsername" | "amount"
                  >
                >
              >
            >;
            unlocking?: Maybe<
              Array<
                Maybe<
                  { __typename?: "Unlocking" } & Pick<
                    Unlocking,
                    | "delegateAddress"
                    | "amount"
                    | "unvoteHeight"
                    | "delegateUsername"
                  >
                >
              >
            >;
          }
        >;
      }
  >;
};

export type AccountTransactionsQueryVariables = Exact<{
  address: Scalars["String"];
  page: Scalars["Int"];
}>;

export type AccountTransactionsQuery = { __typename?: "Query" } & {
  transactionsByAddress?: Maybe<
    | ({ __typename?: "PaginatedTransaction" } & {
        pagination?: Maybe<
          { __typename?: "Pagination" } & Pick<
            Pagination,
            "total" | "perPage" | "lastPage" | "to"
          >
        >;
        data?: Maybe<
          Array<
            Maybe<
              { __typename?: "Transaction" } & Pick<
                Transaction,
                | "id"
                | "senderUsername"
                | "recipientUsername"
                | "recipientId"
                | "amount"
                | "fee"
                | "data"
                | "height"
                | "senderId"
                | "moduleAssetId"
                | "minFee"
                | "size"
                | "blockId"
                | "nonce"
                | "timestamp"
                | "voteAmount"
              > & {
                  votes?: Maybe<
                    Array<
                      Maybe<
                        { __typename?: "Vote" } & Pick<
                          Vote,
                          "delegateAddress" | "delegateUsername" | "amount"
                        >
                      >
                    >
                  >;
                }
            >
          >
        >;
      })
    | { __typename?: "PaginatedTransactionLegacy" }
  >;
};

export type LegacyAccountInfoQueryVariables = Exact<{
  address: Scalars["String"];
}>;

export type LegacyAccountInfoQuery = { __typename?: "Query" } & {
  accountLegacy?: Maybe<
    { __typename?: "LegacyAccount" } & Pick<
      LegacyAccount,
      "username" | "address" | "balance" | "publicKey"
    >
  >;
};

export type LegacyAccountTransactionsQueryVariables = Exact<{
  address: Scalars["String"];
  page: Scalars["Int"];
}>;

export type LegacyAccountTransactionsQuery = { __typename?: "Query" } & {
  transactionsByAddress?: Maybe<
    | { __typename?: "PaginatedTransaction" }
    | ({ __typename?: "PaginatedTransactionLegacy" } & {
        pagination?: Maybe<
          { __typename?: "Pagination" } & Pick<
            Pagination,
            "total" | "perPage" | "lastPage" | "to"
          >
        >;
        data?: Maybe<
          Array<
            Maybe<
              { __typename?: "TransactionLegacy" } & Pick<
                TransactionLegacy,
                | "id"
                | "senderUsername"
                | "recipientUsername"
                | "type"
                | "timestamp"
                | "senderId"
                | "recipientId"
                | "isLegacy"
                | "amount"
                | "fee"
                | "data"
                | "asset"
              >
            >
          >
        >;
      })
  >;
};

export type GetAnalyticsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAnalyticsQuery = { __typename?: "Query" } & {
  stats?: Maybe<
    { __typename?: "Stats" } & Pick<
      Stats,
      | "last24TXs"
      | "blocks"
      | "staked"
      | "supply"
      | "totalTransactions"
      | "totalTransactions30"
    > & {
        lastDay?: Maybe<
          { __typename?: "StatKind" } & Pick<
            StatKind,
            "totalCount" | "totalVolume"
          > & {
              historicalTXs?: Maybe<
                Array<
                  Maybe<
                    { __typename?: "StatElement" } & Pick<
                      StatElement,
                      "date" | "count" | "volume"
                    >
                  >
                >
              >;
              txKinds?: Maybe<
                { __typename?: "TxKinds" } & Pick<
                  TxKinds,
                  "transfers" | "votes" | "poms"
                >
              >;
            }
        >;
        lastMonth?: Maybe<
          { __typename?: "StatKind" } & Pick<
            StatKind,
            "totalCount" | "totalVolume"
          > & {
              historicalTXs?: Maybe<
                Array<
                  Maybe<
                    { __typename?: "StatElement" } & Pick<
                      StatElement,
                      "date" | "count" | "volume"
                    >
                  >
                >
              >;
              txKinds?: Maybe<
                { __typename?: "TxKinds" } & Pick<
                  TxKinds,
                  "transfers" | "votes" | "poms"
                >
              >;
            }
        >;
        lastYear?: Maybe<
          { __typename?: "StatKind" } & Pick<
            StatKind,
            "totalCount" | "totalVolume"
          > & {
              historicalTXs?: Maybe<
                Array<
                  Maybe<
                    { __typename?: "StatElement" } & Pick<
                      StatElement,
                      "date" | "count" | "volume"
                    >
                  >
                >
              >;
              txKinds?: Maybe<
                { __typename?: "TxKinds" } & Pick<
                  TxKinds,
                  "transfers" | "votes" | "poms"
                >
              >;
            }
        >;
      }
  >;
};

export type BlockHeightQueryVariables = Exact<{ [key: string]: never }>;

export type BlockHeightQuery = { __typename?: "Query" } & {
  lastBlock?: Maybe<
    { __typename?: "Block" } & Pick<Block, "id" | "height" | "finalized">
  >;
};

export type LastTenBlocksQueryVariables = Exact<{ [key: string]: never }>;

export type LastTenBlocksQuery = { __typename?: "Query" } & {
  lastBlocks?: Maybe<
    { __typename?: "PaginatedBlock" } & {
      data?: Maybe<
        Array<
          Maybe<
            { __typename?: "Block" } & Pick<
              Block,
              "id" | "timestamp" | "height" | "username" | "address" | "reward"
            >
          >
        >
      >;
    }
  >;
};

export type BlocksByAddressQueryVariables = Exact<{
  address: Scalars["String"];
  page?: Maybe<Scalars["Int"]>;
}>;

export type BlocksByAddressQuery = { __typename?: "Query" } & {
  blocksByAddress?: Maybe<
    { __typename?: "PaginatedBlock" } & {
      data?: Maybe<
        Array<
          Maybe<
            { __typename?: "Block" } & Pick<
              Block,
              "id" | "height" | "timestamp" | "reward" | "isFinal"
            >
          >
        >
      >;
      pagination?: Maybe<
        { __typename?: "Pagination" } & Pick<
          Pagination,
          "total" | "currentPage" | "from" | "to"
        >
      >;
    }
  >;
};

export type DelegatesListQueryVariables = Exact<{ [key: string]: never }>;

export type DelegatesListQuery = { __typename?: "Query" } & {
  delegates?: Maybe<
    { __typename?: "DelegatesWithStats" } & Pick<
      DelegatesWithStats,
      "supply" | "locked"
    > & {
        promises?: Maybe<
          Array<
            Maybe<
              { __typename?: "Promises" } & Pick<
                Promises,
                "username" | "address" | "averageShared" | "promisedShare"
              >
            >
          >
        >;
        delegates?: Maybe<
          { __typename?: "DelegatesList" } & Pick<DelegatesList, "total"> & {
              delegates?: Maybe<
                Array<
                  Maybe<
                    { __typename?: "AccountDelegate" } & Pick<
                      AccountDelegate,
                      "address" | "username"
                    > & {
                        dpos?: Maybe<
                          { __typename?: "Dpos" } & {
                            delegate?: Maybe<
                              { __typename?: "Delegate" } & Pick<
                                Delegate,
                                | "username"
                                | "pomHeights"
                                | "consecutiveMissedBlocks"
                                | "producedBlocks"
                                | "lastForgedHeight"
                                | "isBanned"
                                | "totalVotesReceived"
                                | "consensusWeight"
                                | "rank"
                                | "rankAdjusted"
                                | "isConsensusParticipant"
                                | "nextForgingTime"
                                | "selfVotesAmount"
                              >
                            >;
                          }
                        >;
                      }
                  >
                >
              >;
            }
        >;
      }
  >;
};

export type EternityWallQueryVariables = Exact<{
  page?: Maybe<Scalars["Int"]>;
}>;

export type EternityWallQuery = { __typename?: "Query" } & {
  eternityWall?: Maybe<
    { __typename?: "PaginatedEthernityWallMessage" } & {
      data?: Maybe<
        Array<
          Maybe<
            { __typename?: "EthernityWallMessage" } & Pick<
              EthernityWallMessage,
              | "id"
              | "moduleAssetId"
              | "timestamp"
              | "senderId"
              | "amount"
              | "data"
              | "senderUsername"
            >
          >
        >
      >;
    }
  >;
};

export type GetHistoricalPricesQueryVariables = Exact<{
  currency: Scalars["String"];
}>;

export type GetHistoricalPricesQuery = { __typename?: "Query" } & {
  getHistoricalPrices?: Maybe<
    { __typename?: "CurrencyData" } & Pick<
      CurrencyData,
      "currency" | "value" | "date"
    >
  >;
};

export type KnownAddressesQueryVariables = Exact<{ [key: string]: never }>;

export type KnownAddressesQuery = { __typename?: "Query" } & {
  knownAddresses?: Maybe<
    Array<
      Maybe<
        { __typename?: "KnownAddresses" } & Pick<
          KnownAddresses,
          | "address"
          | "isExchange"
          | "isLiskHq"
          | "isScam"
          | "tag"
          | "identifier"
          | "balance"
        >
      >
    >
  >;
};

export type LastTicksQueryVariables = Exact<{ [key: string]: never }>;

export type LastTicksQuery = { __typename?: "Query" } & {
  lastTicks?: Maybe<
    { __typename?: "LastTicks" } & Pick<
      LastTicks,
      | "LSKUSD"
      | "LSKBTC"
      | "LSKEUR"
      | "LSKKRW"
      | "LSKPLN"
      | "LSKJPY"
      | "LSKCNY"
      | "LSKAED"
    >
  >;
};

export type NetworkInfoQueryVariables = Exact<{ [key: string]: never }>;

export type NetworkInfoQuery = { __typename?: "Query" } & {
  networkInfo?: Maybe<
    { __typename?: "NetworkInfo" } & {
      stats?: Maybe<
        { __typename?: "NetworkPeersStat" } & Pick<
          NetworkPeersStat,
          | "totalPeers"
          | "connectedPeers"
          | "disconnectedPeers"
          | "networkVersionDominant"
        > & {
            networkVersion?: Maybe<
              Array<
                Maybe<
                  { __typename?: "NetworkVersion" } & Pick<
                    NetworkVersion,
                    "version" | "peers"
                  >
                >
              >
            >;
          }
      >;
      peers?: Maybe<
        Array<
          Maybe<
            { __typename?: "Peers" } & Pick<
              Peers,
              | "connected"
              | "ipAddress"
              | "peerId"
              | "networkVersion"
              | "height"
              | "country"
            >
          >
        >
      >;
      countries?: Maybe<
        Array<
          Maybe<
            { __typename?: "Countries" } & Pick<Countries, "country" | "count">
          >
        >
      >;
    }
  >;
};

export type NodeInfoQueryVariables = Exact<{ [key: string]: never }>;

export type NodeInfoQuery = { __typename?: "Query" } & {
  nodeInfo?: Maybe<{ __typename?: "NodeInfo" } & Pick<NodeInfo, "name">>;
};

export type PaginatedBlocksQueryVariables = Exact<{
  page?: Maybe<Scalars["Int"]>;
}>;

export type PaginatedBlocksQuery = { __typename?: "Query" } & {
  lastBlocks?: Maybe<
    { __typename?: "PaginatedBlock" } & {
      data?: Maybe<
        Array<
          Maybe<
            { __typename?: "Block" } & Pick<
              Block,
              "id" | "height" | "username" | "generatorPublicKey"
            >
          >
        >
      >;
      pagination?: Maybe<
        { __typename?: "Pagination" } & Pick<
          Pagination,
          "total" | "currentPage" | "from" | "to"
        >
      >;
    }
  >;
};

export type RichListQueryVariables = Exact<{
  page: Scalars["Int"];
}>;

export type RichListQuery = { __typename?: "Query" } & {
  richList?: Maybe<
    { __typename?: "RichList" } & Pick<RichList, "supply"> & {
        accounts?: Maybe<
          { __typename?: "PaginatedRichListAccount" } & {
            data?: Maybe<
              Array<
                Maybe<
                  { __typename?: "RichListAccount" } & Pick<
                    RichListAccount,
                    "username" | "address" | "balance" | "unlocked"
                  >
                >
              >
            >;
            pagination?: Maybe<
              { __typename?: "Pagination" } & Pick<
                Pagination,
                "total" | "lastPage" | "currentPage" | "perPage" | "from" | "to"
              >
            >;
          }
        >;
      }
  >;
};

export type SearchboxQueryVariables = Exact<{
  term: Scalars["String"];
}>;

export type SearchboxQuery = { __typename?: "Query" } & {
  search?: Maybe<
    { __typename?: "Search" } & {
      transactions?: Maybe<
        Array<
          Maybe<
            { __typename?: "TransactionSearch" } & Pick<TransactionSearch, "id">
          >
        >
      >;
      blocks?: Maybe<
        Array<
          Maybe<
            { __typename?: "BlockSearch" } & Pick<BlockSearch, "height" | "id">
          >
        >
      >;
      accounts?: Maybe<
        Array<
          Maybe<
            { __typename?: "AccountSearch" } & Pick<
              AccountSearch,
              "username" | "address"
            >
          >
        >
      >;
    }
  >;
};

export type LastTenTransactionsQueryVariables = Exact<{ [key: string]: never }>;

export type LastTenTransactionsQuery = { __typename?: "Query" } & {
  transactions?: Maybe<
    { __typename?: "PaginatedTransaction" } & {
      data?: Maybe<
        Array<
          Maybe<
            { __typename?: "Transaction" } & Pick<
              Transaction,
              | "amount"
              | "senderPublicKey"
              | "recipientId"
              | "id"
              | "moduleAssetId"
              | "timestamp"
              | "senderId"
              | "senderUsername"
              | "recipientUsername"
              | "data"
              | "height"
              | "fee"
              | "voteAmount"
            >
          >
        >
      >;
    }
  >;
};

export type LastDayTxQueryVariables = Exact<{ [key: string]: never }>;

export type LastDayTxQuery = { __typename?: "Query" } & {
  txStats?: Maybe<{ __typename?: "TXStats" } & Pick<TxStats, "lastDay">>;
};

export type PaginatedTransactionsQueryVariables = Exact<{
  page?: Maybe<Scalars["Int"]>;
  TXType?: Maybe<Scalars["String"]>;
}>;

export type PaginatedTransactionsQuery = { __typename?: "Query" } & {
  transactions?: Maybe<
    { __typename?: "PaginatedTransaction" } & {
      data?: Maybe<
        Array<
          Maybe<
            { __typename?: "Transaction" } & Pick<
              Transaction,
              | "amount"
              | "senderPublicKey"
              | "senderId"
              | "recipientId"
              | "id"
              | "moduleAssetId"
              | "timestamp"
              | "senderUsername"
              | "recipientUsername"
              | "data"
              | "height"
              | "fee"
              | "voteAmount"
            >
          >
        >
      >;
      pagination?: Maybe<
        { __typename?: "Pagination" } & Pick<
          Pagination,
          "total" | "currentPage" | "from" | "to"
        >
      >;
    }
  >;
};

export type VotesQueryVariables = Exact<{
  page: Scalars["Int"];
}>;

export type VotesQuery = { __typename?: "Query" } & {
  votes?: Maybe<
    { __typename?: "PaginatedVotes" } & {
      pagination?: Maybe<
        { __typename?: "Pagination" } & Pick<
          Pagination,
          "total" | "lastPage" | "currentPage" | "perPage" | "from" | "to"
        >
      >;
      data?: Maybe<
        Array<
          Maybe<
            { __typename?: "Vote" } & Pick<
              Vote,
              | "id"
              | "amount"
              | "sentAddress"
              | "receivedAddress"
              | "timestamp"
              | "senderUsername"
              | "recipientUsername"
            >
          >
        >
      >;
    }
  >;
};

export type WhaleTransactionsQueryVariables = Exact<{
  page: Scalars["Int"];
}>;

export type WhaleTransactionsQuery = { __typename?: "Query" } & {
  whaleTransactions?: Maybe<
    { __typename?: "PaginatedTransaction" } & {
      data?: Maybe<
        Array<
          Maybe<
            { __typename?: "Transaction" } & Pick<
              Transaction,
              | "id"
              | "timestamp"
              | "recipientId"
              | "senderId"
              | "amount"
              | "senderUsername"
              | "recipientUsername"
            >
          >
        >
      >;
      pagination?: Maybe<
        { __typename?: "Pagination" } & Pick<
          Pagination,
          "total" | "lastPage" | "currentPage" | "perPage" | "from" | "to"
        >
      >;
    }
  >;
};

export const AccountInfoDocument = gql`
  query accountInfo($addressContext: String!) {
    account(address: $addressContext) {
      username
      address
      isDelegate
      token {
        balance
        locked
      }
      sequence {
        nonce
      }
      keys {
        optionalKeys
        mandatoryKeys
        numberOfSignatures
      }
      dpos {
        delegate {
          username
          pomHeights
          consecutiveMissedBlocks
          lastForgedHeight
          isBanned
          totalVotesReceived
          selfVotesAmount
          rankAdjusted
          isConsensusParticipant
          minActiveHeight
          nextForgingTime
          producedBlocks
          rank
        }
        sentVotes {
          delegateAddress
          delegateUsername
          amount
        }
        receivedVotes {
          sender
          senderUsername
          amount
        }
        unlocking {
          delegateAddress
          amount
          unvoteHeight
          delegateUsername
        }
      }
      hexAddress
      publicKey
    }
  }
`;

/**
 * __useAccountInfoQuery__
 *
 * To run a query within a React component, call `useAccountInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountInfoQuery({
 *   variables: {
 *      addressContext: // value for 'addressContext'
 *   },
 * });
 */
export function useAccountInfoQuery(
  baseOptions: Apollo.QueryHookOptions<
    AccountInfoQuery,
    AccountInfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AccountInfoQuery, AccountInfoQueryVariables>(
    AccountInfoDocument,
    options
  );
}
export function useAccountInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AccountInfoQuery,
    AccountInfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AccountInfoQuery, AccountInfoQueryVariables>(
    AccountInfoDocument,
    options
  );
}
export type AccountInfoQueryHookResult = ReturnType<typeof useAccountInfoQuery>;
export type AccountInfoLazyQueryHookResult = ReturnType<
  typeof useAccountInfoLazyQuery
>;
export type AccountInfoQueryResult = Apollo.QueryResult<
  AccountInfoQuery,
  AccountInfoQueryVariables
>;
export const AccountTransactionsDocument = gql`
  query accountTransactions($address: String!, $page: Int!) {
    transactionsByAddress(address: $address, page: $page) {
      ... on PaginatedTransaction {
        pagination {
          total
          perPage
          lastPage
          to
        }
        data {
          id
          senderUsername
          recipientUsername
          recipientId
          amount
          fee
          data
          height
          senderId
          moduleAssetId
          minFee
          size
          blockId
          nonce
          timestamp
          voteAmount
          votes {
            delegateAddress
            delegateUsername
            amount
          }
        }
      }
    }
  }
`;

/**
 * __useAccountTransactionsQuery__
 *
 * To run a query within a React component, call `useAccountTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountTransactionsQuery({
 *   variables: {
 *      address: // value for 'address'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useAccountTransactionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    AccountTransactionsQuery,
    AccountTransactionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    AccountTransactionsQuery,
    AccountTransactionsQueryVariables
  >(AccountTransactionsDocument, options);
}
export function useAccountTransactionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AccountTransactionsQuery,
    AccountTransactionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    AccountTransactionsQuery,
    AccountTransactionsQueryVariables
  >(AccountTransactionsDocument, options);
}
export type AccountTransactionsQueryHookResult = ReturnType<
  typeof useAccountTransactionsQuery
>;
export type AccountTransactionsLazyQueryHookResult = ReturnType<
  typeof useAccountTransactionsLazyQuery
>;
export type AccountTransactionsQueryResult = Apollo.QueryResult<
  AccountTransactionsQuery,
  AccountTransactionsQueryVariables
>;
export const LegacyAccountInfoDocument = gql`
  query legacyAccountInfo($address: String!) {
    accountLegacy(address: $address) {
      username
      address
      balance
      publicKey
    }
  }
`;

/**
 * __useLegacyAccountInfoQuery__
 *
 * To run a query within a React component, call `useLegacyAccountInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useLegacyAccountInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLegacyAccountInfoQuery({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useLegacyAccountInfoQuery(
  baseOptions: Apollo.QueryHookOptions<
    LegacyAccountInfoQuery,
    LegacyAccountInfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    LegacyAccountInfoQuery,
    LegacyAccountInfoQueryVariables
  >(LegacyAccountInfoDocument, options);
}
export function useLegacyAccountInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LegacyAccountInfoQuery,
    LegacyAccountInfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    LegacyAccountInfoQuery,
    LegacyAccountInfoQueryVariables
  >(LegacyAccountInfoDocument, options);
}
export type LegacyAccountInfoQueryHookResult = ReturnType<
  typeof useLegacyAccountInfoQuery
>;
export type LegacyAccountInfoLazyQueryHookResult = ReturnType<
  typeof useLegacyAccountInfoLazyQuery
>;
export type LegacyAccountInfoQueryResult = Apollo.QueryResult<
  LegacyAccountInfoQuery,
  LegacyAccountInfoQueryVariables
>;
export const LegacyAccountTransactionsDocument = gql`
  query legacyAccountTransactions($address: String!, $page: Int!) {
    transactionsByAddress(address: $address, page: $page) {
      ... on PaginatedTransactionLegacy {
        pagination {
          total
          perPage
          lastPage
          to
        }
        data {
          id
          senderUsername
          recipientUsername
          type
          timestamp
          senderId
          recipientId
          isLegacy
          amount
          fee
          data
          recipientId
          senderId
          asset
        }
      }
    }
  }
`;

/**
 * __useLegacyAccountTransactionsQuery__
 *
 * To run a query within a React component, call `useLegacyAccountTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLegacyAccountTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLegacyAccountTransactionsQuery({
 *   variables: {
 *      address: // value for 'address'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useLegacyAccountTransactionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    LegacyAccountTransactionsQuery,
    LegacyAccountTransactionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    LegacyAccountTransactionsQuery,
    LegacyAccountTransactionsQueryVariables
  >(LegacyAccountTransactionsDocument, options);
}
export function useLegacyAccountTransactionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LegacyAccountTransactionsQuery,
    LegacyAccountTransactionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    LegacyAccountTransactionsQuery,
    LegacyAccountTransactionsQueryVariables
  >(LegacyAccountTransactionsDocument, options);
}
export type LegacyAccountTransactionsQueryHookResult = ReturnType<
  typeof useLegacyAccountTransactionsQuery
>;
export type LegacyAccountTransactionsLazyQueryHookResult = ReturnType<
  typeof useLegacyAccountTransactionsLazyQuery
>;
export type LegacyAccountTransactionsQueryResult = Apollo.QueryResult<
  LegacyAccountTransactionsQuery,
  LegacyAccountTransactionsQueryVariables
>;
export const GetAnalyticsDocument = gql`
  query getAnalytics {
    stats {
      last24TXs
      blocks
      staked
      supply
      totalTransactions
      totalTransactions30
      lastDay {
        historicalTXs {
          date
          count
          volume
        }
        totalCount
        totalVolume
        txKinds {
          transfers
          votes
          poms
        }
      }
      lastMonth {
        historicalTXs {
          date
          count
          volume
        }
        totalCount
        totalVolume
        txKinds {
          transfers
          votes
          poms
        }
      }
      lastYear {
        historicalTXs {
          date
          count
          volume
        }
        totalCount
        totalVolume
        txKinds {
          transfers
          votes
          poms
        }
      }
    }
  }
`;

/**
 * __useGetAnalyticsQuery__
 *
 * To run a query within a React component, call `useGetAnalyticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAnalyticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAnalyticsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAnalyticsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAnalyticsQuery,
    GetAnalyticsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAnalyticsQuery, GetAnalyticsQueryVariables>(
    GetAnalyticsDocument,
    options
  );
}
export function useGetAnalyticsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAnalyticsQuery,
    GetAnalyticsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAnalyticsQuery, GetAnalyticsQueryVariables>(
    GetAnalyticsDocument,
    options
  );
}
export type GetAnalyticsQueryHookResult = ReturnType<
  typeof useGetAnalyticsQuery
>;
export type GetAnalyticsLazyQueryHookResult = ReturnType<
  typeof useGetAnalyticsLazyQuery
>;
export type GetAnalyticsQueryResult = Apollo.QueryResult<
  GetAnalyticsQuery,
  GetAnalyticsQueryVariables
>;
export const BlockHeightDocument = gql`
  query blockHeight {
    lastBlock {
      id
      height
      finalized
    }
  }
`;

/**
 * __useBlockHeightQuery__
 *
 * To run a query within a React component, call `useBlockHeightQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlockHeightQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlockHeightQuery({
 *   variables: {
 *   },
 * });
 */
export function useBlockHeightQuery(
  baseOptions?: Apollo.QueryHookOptions<
    BlockHeightQuery,
    BlockHeightQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BlockHeightQuery, BlockHeightQueryVariables>(
    BlockHeightDocument,
    options
  );
}
export function useBlockHeightLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BlockHeightQuery,
    BlockHeightQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BlockHeightQuery, BlockHeightQueryVariables>(
    BlockHeightDocument,
    options
  );
}
export type BlockHeightQueryHookResult = ReturnType<typeof useBlockHeightQuery>;
export type BlockHeightLazyQueryHookResult = ReturnType<
  typeof useBlockHeightLazyQuery
>;
export type BlockHeightQueryResult = Apollo.QueryResult<
  BlockHeightQuery,
  BlockHeightQueryVariables
>;
export const LastTenBlocksDocument = gql`
  query lastTenBlocks {
    lastBlocks(page: 1) {
      data {
        id
        timestamp
        height
        username
        address
        reward
      }
    }
  }
`;

/**
 * __useLastTenBlocksQuery__
 *
 * To run a query within a React component, call `useLastTenBlocksQuery` and pass it any options that fit your needs.
 * When your component renders, `useLastTenBlocksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLastTenBlocksQuery({
 *   variables: {
 *   },
 * });
 */
export function useLastTenBlocksQuery(
  baseOptions?: Apollo.QueryHookOptions<
    LastTenBlocksQuery,
    LastTenBlocksQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LastTenBlocksQuery, LastTenBlocksQueryVariables>(
    LastTenBlocksDocument,
    options
  );
}
export function useLastTenBlocksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LastTenBlocksQuery,
    LastTenBlocksQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LastTenBlocksQuery, LastTenBlocksQueryVariables>(
    LastTenBlocksDocument,
    options
  );
}
export type LastTenBlocksQueryHookResult = ReturnType<
  typeof useLastTenBlocksQuery
>;
export type LastTenBlocksLazyQueryHookResult = ReturnType<
  typeof useLastTenBlocksLazyQuery
>;
export type LastTenBlocksQueryResult = Apollo.QueryResult<
  LastTenBlocksQuery,
  LastTenBlocksQueryVariables
>;
export const BlocksByAddressDocument = gql`
  query blocksByAddress($address: String!, $page: Int) {
    blocksByAddress(address: $address, page: $page) {
      data {
        id
        height
        timestamp
        reward
        isFinal
      }
      pagination {
        total
        currentPage
        from
        to
      }
    }
  }
`;

/**
 * __useBlocksByAddressQuery__
 *
 * To run a query within a React component, call `useBlocksByAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlocksByAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlocksByAddressQuery({
 *   variables: {
 *      address: // value for 'address'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useBlocksByAddressQuery(
  baseOptions: Apollo.QueryHookOptions<
    BlocksByAddressQuery,
    BlocksByAddressQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BlocksByAddressQuery, BlocksByAddressQueryVariables>(
    BlocksByAddressDocument,
    options
  );
}
export function useBlocksByAddressLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BlocksByAddressQuery,
    BlocksByAddressQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    BlocksByAddressQuery,
    BlocksByAddressQueryVariables
  >(BlocksByAddressDocument, options);
}
export type BlocksByAddressQueryHookResult = ReturnType<
  typeof useBlocksByAddressQuery
>;
export type BlocksByAddressLazyQueryHookResult = ReturnType<
  typeof useBlocksByAddressLazyQuery
>;
export type BlocksByAddressQueryResult = Apollo.QueryResult<
  BlocksByAddressQuery,
  BlocksByAddressQueryVariables
>;
export const DelegatesListDocument = gql`
  query delegatesList {
    delegates {
      promises {
        username
        address
        averageShared
        promisedShare
      }
      supply
      locked
      delegates {
        delegates {
          address
          username
          dpos {
            delegate {
              username
              pomHeights
              consecutiveMissedBlocks
              producedBlocks
              lastForgedHeight
              isBanned
              totalVotesReceived
              consensusWeight
              rank
              rankAdjusted
              isConsensusParticipant
              nextForgingTime
              selfVotesAmount
            }
          }
        }
        total
      }
    }
  }
`;

/**
 * __useDelegatesListQuery__
 *
 * To run a query within a React component, call `useDelegatesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useDelegatesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDelegatesListQuery({
 *   variables: {
 *   },
 * });
 */
export function useDelegatesListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    DelegatesListQuery,
    DelegatesListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DelegatesListQuery, DelegatesListQueryVariables>(
    DelegatesListDocument,
    options
  );
}
export function useDelegatesListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DelegatesListQuery,
    DelegatesListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DelegatesListQuery, DelegatesListQueryVariables>(
    DelegatesListDocument,
    options
  );
}
export type DelegatesListQueryHookResult = ReturnType<
  typeof useDelegatesListQuery
>;
export type DelegatesListLazyQueryHookResult = ReturnType<
  typeof useDelegatesListLazyQuery
>;
export type DelegatesListQueryResult = Apollo.QueryResult<
  DelegatesListQuery,
  DelegatesListQueryVariables
>;
export const EternityWallDocument = gql`
  query eternityWall($page: Int) {
    eternityWall(page: $page) {
      data {
        id
        moduleAssetId
        timestamp
        senderId
        amount
        data
        senderUsername
      }
    }
  }
`;

/**
 * __useEternityWallQuery__
 *
 * To run a query within a React component, call `useEternityWallQuery` and pass it any options that fit your needs.
 * When your component renders, `useEternityWallQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEternityWallQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useEternityWallQuery(
  baseOptions?: Apollo.QueryHookOptions<
    EternityWallQuery,
    EternityWallQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EternityWallQuery, EternityWallQueryVariables>(
    EternityWallDocument,
    options
  );
}
export function useEternityWallLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EternityWallQuery,
    EternityWallQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<EternityWallQuery, EternityWallQueryVariables>(
    EternityWallDocument,
    options
  );
}
export type EternityWallQueryHookResult = ReturnType<
  typeof useEternityWallQuery
>;
export type EternityWallLazyQueryHookResult = ReturnType<
  typeof useEternityWallLazyQuery
>;
export type EternityWallQueryResult = Apollo.QueryResult<
  EternityWallQuery,
  EternityWallQueryVariables
>;
export const GetHistoricalPricesDocument = gql`
  query getHistoricalPrices($currency: String!) {
    getHistoricalPrices(currency: $currency) {
      currency
      value
      date
    }
  }
`;

/**
 * __useGetHistoricalPricesQuery__
 *
 * To run a query within a React component, call `useGetHistoricalPricesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHistoricalPricesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHistoricalPricesQuery({
 *   variables: {
 *      currency: // value for 'currency'
 *   },
 * });
 */
export function useGetHistoricalPricesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetHistoricalPricesQuery,
    GetHistoricalPricesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetHistoricalPricesQuery,
    GetHistoricalPricesQueryVariables
  >(GetHistoricalPricesDocument, options);
}
export function useGetHistoricalPricesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetHistoricalPricesQuery,
    GetHistoricalPricesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetHistoricalPricesQuery,
    GetHistoricalPricesQueryVariables
  >(GetHistoricalPricesDocument, options);
}
export type GetHistoricalPricesQueryHookResult = ReturnType<
  typeof useGetHistoricalPricesQuery
>;
export type GetHistoricalPricesLazyQueryHookResult = ReturnType<
  typeof useGetHistoricalPricesLazyQuery
>;
export type GetHistoricalPricesQueryResult = Apollo.QueryResult<
  GetHistoricalPricesQuery,
  GetHistoricalPricesQueryVariables
>;
export const KnownAddressesDocument = gql`
  query knownAddresses {
    knownAddresses {
      address
      isExchange
      isLiskHq
      isScam
      tag
      identifier
      balance
    }
  }
`;

/**
 * __useKnownAddressesQuery__
 *
 * To run a query within a React component, call `useKnownAddressesQuery` and pass it any options that fit your needs.
 * When your component renders, `useKnownAddressesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKnownAddressesQuery({
 *   variables: {
 *   },
 * });
 */
export function useKnownAddressesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    KnownAddressesQuery,
    KnownAddressesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<KnownAddressesQuery, KnownAddressesQueryVariables>(
    KnownAddressesDocument,
    options
  );
}
export function useKnownAddressesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    KnownAddressesQuery,
    KnownAddressesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<KnownAddressesQuery, KnownAddressesQueryVariables>(
    KnownAddressesDocument,
    options
  );
}
export type KnownAddressesQueryHookResult = ReturnType<
  typeof useKnownAddressesQuery
>;
export type KnownAddressesLazyQueryHookResult = ReturnType<
  typeof useKnownAddressesLazyQuery
>;
export type KnownAddressesQueryResult = Apollo.QueryResult<
  KnownAddressesQuery,
  KnownAddressesQueryVariables
>;
export const LastTicksDocument = gql`
  query lastTicks {
    lastTicks {
      LSKUSD
      LSKBTC
      LSKEUR
      LSKKRW
      LSKPLN
      LSKJPY
      LSKCNY
      LSKAED
    }
  }
`;

/**
 * __useLastTicksQuery__
 *
 * To run a query within a React component, call `useLastTicksQuery` and pass it any options that fit your needs.
 * When your component renders, `useLastTicksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLastTicksQuery({
 *   variables: {
 *   },
 * });
 */
export function useLastTicksQuery(
  baseOptions?: Apollo.QueryHookOptions<LastTicksQuery, LastTicksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LastTicksQuery, LastTicksQueryVariables>(
    LastTicksDocument,
    options
  );
}
export function useLastTicksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LastTicksQuery,
    LastTicksQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LastTicksQuery, LastTicksQueryVariables>(
    LastTicksDocument,
    options
  );
}
export type LastTicksQueryHookResult = ReturnType<typeof useLastTicksQuery>;
export type LastTicksLazyQueryHookResult = ReturnType<
  typeof useLastTicksLazyQuery
>;
export type LastTicksQueryResult = Apollo.QueryResult<
  LastTicksQuery,
  LastTicksQueryVariables
>;
export const NetworkInfoDocument = gql`
  query networkInfo {
    networkInfo {
      stats {
        totalPeers
        connectedPeers
        disconnectedPeers
        networkVersion {
          version
          peers
        }
        networkVersionDominant
      }
      peers {
        connected
        ipAddress
        peerId
        networkVersion
        height
        country
      }
      countries {
        country
        count
      }
    }
  }
`;

/**
 * __useNetworkInfoQuery__
 *
 * To run a query within a React component, call `useNetworkInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useNetworkInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNetworkInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useNetworkInfoQuery(
  baseOptions?: Apollo.QueryHookOptions<
    NetworkInfoQuery,
    NetworkInfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<NetworkInfoQuery, NetworkInfoQueryVariables>(
    NetworkInfoDocument,
    options
  );
}
export function useNetworkInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    NetworkInfoQuery,
    NetworkInfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<NetworkInfoQuery, NetworkInfoQueryVariables>(
    NetworkInfoDocument,
    options
  );
}
export type NetworkInfoQueryHookResult = ReturnType<typeof useNetworkInfoQuery>;
export type NetworkInfoLazyQueryHookResult = ReturnType<
  typeof useNetworkInfoLazyQuery
>;
export type NetworkInfoQueryResult = Apollo.QueryResult<
  NetworkInfoQuery,
  NetworkInfoQueryVariables
>;
export const NodeInfoDocument = gql`
  query nodeInfo {
    nodeInfo {
      name
    }
  }
`;

/**
 * __useNodeInfoQuery__
 *
 * To run a query within a React component, call `useNodeInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useNodeInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNodeInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useNodeInfoQuery(
  baseOptions?: Apollo.QueryHookOptions<NodeInfoQuery, NodeInfoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<NodeInfoQuery, NodeInfoQueryVariables>(
    NodeInfoDocument,
    options
  );
}
export function useNodeInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    NodeInfoQuery,
    NodeInfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<NodeInfoQuery, NodeInfoQueryVariables>(
    NodeInfoDocument,
    options
  );
}
export type NodeInfoQueryHookResult = ReturnType<typeof useNodeInfoQuery>;
export type NodeInfoLazyQueryHookResult = ReturnType<
  typeof useNodeInfoLazyQuery
>;
export type NodeInfoQueryResult = Apollo.QueryResult<
  NodeInfoQuery,
  NodeInfoQueryVariables
>;
export const PaginatedBlocksDocument = gql`
  query paginatedBlocks($page: Int) {
    lastBlocks(page: $page) {
      data {
        id
        height
        username
        generatorPublicKey
      }
      pagination {
        total
        currentPage
        from
        to
      }
    }
  }
`;

/**
 * __usePaginatedBlocksQuery__
 *
 * To run a query within a React component, call `usePaginatedBlocksQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaginatedBlocksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaginatedBlocksQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function usePaginatedBlocksQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PaginatedBlocksQuery,
    PaginatedBlocksQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PaginatedBlocksQuery, PaginatedBlocksQueryVariables>(
    PaginatedBlocksDocument,
    options
  );
}
export function usePaginatedBlocksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PaginatedBlocksQuery,
    PaginatedBlocksQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PaginatedBlocksQuery,
    PaginatedBlocksQueryVariables
  >(PaginatedBlocksDocument, options);
}
export type PaginatedBlocksQueryHookResult = ReturnType<
  typeof usePaginatedBlocksQuery
>;
export type PaginatedBlocksLazyQueryHookResult = ReturnType<
  typeof usePaginatedBlocksLazyQuery
>;
export type PaginatedBlocksQueryResult = Apollo.QueryResult<
  PaginatedBlocksQuery,
  PaginatedBlocksQueryVariables
>;
export const RichListDocument = gql`
  query richList($page: Int!) {
    richList(page: $page) {
      supply
      accounts {
        data {
          username
          address
          balance
          unlocked
        }
        pagination {
          total
          lastPage
          currentPage
          perPage
          from
          to
        }
      }
    }
  }
`;

/**
 * __useRichListQuery__
 *
 * To run a query within a React component, call `useRichListQuery` and pass it any options that fit your needs.
 * When your component renders, `useRichListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRichListQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useRichListQuery(
  baseOptions: Apollo.QueryHookOptions<RichListQuery, RichListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RichListQuery, RichListQueryVariables>(
    RichListDocument,
    options
  );
}
export function useRichListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    RichListQuery,
    RichListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RichListQuery, RichListQueryVariables>(
    RichListDocument,
    options
  );
}
export type RichListQueryHookResult = ReturnType<typeof useRichListQuery>;
export type RichListLazyQueryHookResult = ReturnType<
  typeof useRichListLazyQuery
>;
export type RichListQueryResult = Apollo.QueryResult<
  RichListQuery,
  RichListQueryVariables
>;
export const SearchboxDocument = gql`
  query searchbox($term: String!) {
    search(term: $term) {
      transactions {
        id
      }
      blocks {
        height
        id
      }
      accounts {
        username
        address
      }
    }
  }
`;

/**
 * __useSearchboxQuery__
 *
 * To run a query within a React component, call `useSearchboxQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchboxQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchboxQuery({
 *   variables: {
 *      term: // value for 'term'
 *   },
 * });
 */
export function useSearchboxQuery(
  baseOptions: Apollo.QueryHookOptions<SearchboxQuery, SearchboxQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchboxQuery, SearchboxQueryVariables>(
    SearchboxDocument,
    options
  );
}
export function useSearchboxLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchboxQuery,
    SearchboxQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SearchboxQuery, SearchboxQueryVariables>(
    SearchboxDocument,
    options
  );
}
export type SearchboxQueryHookResult = ReturnType<typeof useSearchboxQuery>;
export type SearchboxLazyQueryHookResult = ReturnType<
  typeof useSearchboxLazyQuery
>;
export type SearchboxQueryResult = Apollo.QueryResult<
  SearchboxQuery,
  SearchboxQueryVariables
>;
export const LastTenTransactionsDocument = gql`
  query lastTenTransactions {
    transactions(page: 1) {
      data {
        amount
        senderPublicKey
        recipientId
        id
        moduleAssetId
        timestamp
        senderId
        senderUsername
        recipientId
        recipientUsername
        data
        height
        fee
        voteAmount
      }
    }
  }
`;

/**
 * __useLastTenTransactionsQuery__
 *
 * To run a query within a React component, call `useLastTenTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLastTenTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLastTenTransactionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useLastTenTransactionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    LastTenTransactionsQuery,
    LastTenTransactionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    LastTenTransactionsQuery,
    LastTenTransactionsQueryVariables
  >(LastTenTransactionsDocument, options);
}
export function useLastTenTransactionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LastTenTransactionsQuery,
    LastTenTransactionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    LastTenTransactionsQuery,
    LastTenTransactionsQueryVariables
  >(LastTenTransactionsDocument, options);
}
export type LastTenTransactionsQueryHookResult = ReturnType<
  typeof useLastTenTransactionsQuery
>;
export type LastTenTransactionsLazyQueryHookResult = ReturnType<
  typeof useLastTenTransactionsLazyQuery
>;
export type LastTenTransactionsQueryResult = Apollo.QueryResult<
  LastTenTransactionsQuery,
  LastTenTransactionsQueryVariables
>;
export const LastDayTxDocument = gql`
  query lastDayTx {
    txStats {
      lastDay
    }
  }
`;

/**
 * __useLastDayTxQuery__
 *
 * To run a query within a React component, call `useLastDayTxQuery` and pass it any options that fit your needs.
 * When your component renders, `useLastDayTxQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLastDayTxQuery({
 *   variables: {
 *   },
 * });
 */
export function useLastDayTxQuery(
  baseOptions?: Apollo.QueryHookOptions<LastDayTxQuery, LastDayTxQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LastDayTxQuery, LastDayTxQueryVariables>(
    LastDayTxDocument,
    options
  );
}
export function useLastDayTxLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LastDayTxQuery,
    LastDayTxQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LastDayTxQuery, LastDayTxQueryVariables>(
    LastDayTxDocument,
    options
  );
}
export type LastDayTxQueryHookResult = ReturnType<typeof useLastDayTxQuery>;
export type LastDayTxLazyQueryHookResult = ReturnType<
  typeof useLastDayTxLazyQuery
>;
export type LastDayTxQueryResult = Apollo.QueryResult<
  LastDayTxQuery,
  LastDayTxQueryVariables
>;
export const PaginatedTransactionsDocument = gql`
  query paginatedTransactions($page: Int, $TXType: String) {
    transactions(page: $page, TXType: $TXType) {
      data {
        amount
        senderPublicKey
        senderId
        recipientId
        id
        moduleAssetId
        timestamp
        senderUsername
        recipientUsername
        data
        height
        fee
        voteAmount
      }
      pagination {
        total
        currentPage
        from
        to
      }
    }
  }
`;

/**
 * __usePaginatedTransactionsQuery__
 *
 * To run a query within a React component, call `usePaginatedTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaginatedTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaginatedTransactionsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      TXType: // value for 'TXType'
 *   },
 * });
 */
export function usePaginatedTransactionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PaginatedTransactionsQuery,
    PaginatedTransactionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    PaginatedTransactionsQuery,
    PaginatedTransactionsQueryVariables
  >(PaginatedTransactionsDocument, options);
}
export function usePaginatedTransactionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PaginatedTransactionsQuery,
    PaginatedTransactionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PaginatedTransactionsQuery,
    PaginatedTransactionsQueryVariables
  >(PaginatedTransactionsDocument, options);
}
export type PaginatedTransactionsQueryHookResult = ReturnType<
  typeof usePaginatedTransactionsQuery
>;
export type PaginatedTransactionsLazyQueryHookResult = ReturnType<
  typeof usePaginatedTransactionsLazyQuery
>;
export type PaginatedTransactionsQueryResult = Apollo.QueryResult<
  PaginatedTransactionsQuery,
  PaginatedTransactionsQueryVariables
>;
export const VotesDocument = gql`
  query votes($page: Int!) {
    votes(page: $page) {
      pagination {
        total
        lastPage
        currentPage
        perPage
        from
        to
      }
      data {
        id
        amount
        sentAddress
        receivedAddress
        timestamp
        senderUsername
        recipientUsername
      }
    }
  }
`;

/**
 * __useVotesQuery__
 *
 * To run a query within a React component, call `useVotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useVotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVotesQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useVotesQuery(
  baseOptions: Apollo.QueryHookOptions<VotesQuery, VotesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<VotesQuery, VotesQueryVariables>(
    VotesDocument,
    options
  );
}
export function useVotesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<VotesQuery, VotesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<VotesQuery, VotesQueryVariables>(
    VotesDocument,
    options
  );
}
export type VotesQueryHookResult = ReturnType<typeof useVotesQuery>;
export type VotesLazyQueryHookResult = ReturnType<typeof useVotesLazyQuery>;
export type VotesQueryResult = Apollo.QueryResult<
  VotesQuery,
  VotesQueryVariables
>;
export const WhaleTransactionsDocument = gql`
  query whaleTransactions($page: Int!) {
    whaleTransactions(page: $page) {
      data {
        id
        timestamp
        recipientId
        senderId
        amount
        senderUsername
        recipientUsername
      }
      pagination {
        total
        lastPage
        currentPage
        perPage
        from
        to
      }
    }
  }
`;

/**
 * __useWhaleTransactionsQuery__
 *
 * To run a query within a React component, call `useWhaleTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhaleTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhaleTransactionsQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useWhaleTransactionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    WhaleTransactionsQuery,
    WhaleTransactionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    WhaleTransactionsQuery,
    WhaleTransactionsQueryVariables
  >(WhaleTransactionsDocument, options);
}
export function useWhaleTransactionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    WhaleTransactionsQuery,
    WhaleTransactionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    WhaleTransactionsQuery,
    WhaleTransactionsQueryVariables
  >(WhaleTransactionsDocument, options);
}
export type WhaleTransactionsQueryHookResult = ReturnType<
  typeof useWhaleTransactionsQuery
>;
export type WhaleTransactionsLazyQueryHookResult = ReturnType<
  typeof useWhaleTransactionsLazyQuery
>;
export type WhaleTransactionsQueryResult = Apollo.QueryResult<
  WhaleTransactionsQuery,
  WhaleTransactionsQueryVariables
>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Account: ResolverTypeWrapper<Account>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  AccountDelegate: ResolverTypeWrapper<AccountDelegate>;
  AccountSearch: ResolverTypeWrapper<AccountSearch>;
  Block: ResolverTypeWrapper<Block>;
  BlockLegacy: ResolverTypeWrapper<BlockLegacy>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  BlockLegacyForTransactions: ResolverTypeWrapper<BlockLegacyForTransactions>;
  BlockSearch: ResolverTypeWrapper<BlockSearch>;
  BlockTransactionsOrLegacy:
    | ResolversTypes["BlockWithTransactions"]
    | ResolversTypes["BlockLegacy"];
  BlockWithTransactions: ResolverTypeWrapper<BlockWithTransactions>;
  Countries: ResolverTypeWrapper<Countries>;
  Currencies: Currencies;
  CurrencyData: ResolverTypeWrapper<CurrencyData>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  Delegate: ResolverTypeWrapper<Delegate>;
  DelegatesList: ResolverTypeWrapper<DelegatesList>;
  DelegatesWithStats: ResolverTypeWrapper<DelegatesWithStats>;
  Dpos: ResolverTypeWrapper<Dpos>;
  EthernityWallMessage: ResolverTypeWrapper<EthernityWallMessage>;
  Keys: ResolverTypeWrapper<Keys>;
  KnownAddresses: ResolverTypeWrapper<KnownAddresses>;
  LastTicks: ResolverTypeWrapper<LastTicks>;
  LegacyAccount: ResolverTypeWrapper<LegacyAccount>;
  MultisigRegistration: ResolverTypeWrapper<MultisigRegistration>;
  NetworkInfo: ResolverTypeWrapper<NetworkInfo>;
  NetworkPeersStat: ResolverTypeWrapper<NetworkPeersStat>;
  NetworkVersion: ResolverTypeWrapper<NetworkVersion>;
  NodeInfo: ResolverTypeWrapper<NodeInfo>;
  PaginatedBlock: ResolverTypeWrapper<PaginatedBlock>;
  PaginatedEthernityWallMessage: ResolverTypeWrapper<
    PaginatedEthernityWallMessage
  >;
  PaginatedRichListAccount: ResolverTypeWrapper<PaginatedRichListAccount>;
  PaginatedTransaction: ResolverTypeWrapper<PaginatedTransaction>;
  PaginatedTransactionLegacy: ResolverTypeWrapper<PaginatedTransactionLegacy>;
  PaginatedTransactionOrLegacy:
    | ResolversTypes["PaginatedTransaction"]
    | ResolversTypes["PaginatedTransactionLegacy"];
  PaginatedVotes: ResolverTypeWrapper<PaginatedVotes>;
  Pagination: ResolverTypeWrapper<Pagination>;
  Peers: ResolverTypeWrapper<Peers>;
  PomData: ResolverTypeWrapper<PomData>;
  Promises: ResolverTypeWrapper<Promises>;
  Query: ResolverTypeWrapper<{}>;
  ReceivedVotes: ResolverTypeWrapper<ReceivedVotes>;
  RichList: ResolverTypeWrapper<RichList>;
  RichListAccount: ResolverTypeWrapper<RichListAccount>;
  Search: ResolverTypeWrapper<Search>;
  SentVotes: ResolverTypeWrapper<SentVotes>;
  Sequence: ResolverTypeWrapper<Sequence>;
  StatElement: ResolverTypeWrapper<StatElement>;
  StatKind: ResolverTypeWrapper<StatKind>;
  Stats: ResolverTypeWrapper<Stats>;
  TXStats: ResolverTypeWrapper<TxStats>;
  Token: ResolverTypeWrapper<Token>;
  TokenUnlock: ResolverTypeWrapper<TokenUnlock>;
  Transaction: ResolverTypeWrapper<Transaction>;
  TransactionLegacy: ResolverTypeWrapper<TransactionLegacy>;
  TransactionSearch: ResolverTypeWrapper<TransactionSearch>;
  TransactionWithBlock: ResolverTypeWrapper<TransactionWithBlock>;
  TransactionWithBlockLegacy: ResolverTypeWrapper<TransactionWithBlockLegacy>;
  TransactionWithBlockOrLegacy:
    | ResolversTypes["TransactionWithBlock"]
    | ResolversTypes["TransactionWithBlockLegacy"];
  TxKinds: ResolverTypeWrapper<TxKinds>;
  Unlocking: ResolverTypeWrapper<Unlocking>;
  Vote: ResolverTypeWrapper<Vote>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  String: Scalars["String"];
  Boolean: Scalars["Boolean"];
  AccountDelegate: AccountDelegate;
  AccountSearch: AccountSearch;
  Block: Block;
  BlockLegacy: BlockLegacy;
  Int: Scalars["Int"];
  BlockLegacyForTransactions: BlockLegacyForTransactions;
  BlockSearch: BlockSearch;
  BlockTransactionsOrLegacy:
    | ResolversParentTypes["BlockWithTransactions"]
    | ResolversParentTypes["BlockLegacy"];
  BlockWithTransactions: BlockWithTransactions;
  Countries: Countries;
  CurrencyData: CurrencyData;
  Float: Scalars["Float"];
  Delegate: Delegate;
  DelegatesList: DelegatesList;
  DelegatesWithStats: DelegatesWithStats;
  Dpos: Dpos;
  EthernityWallMessage: EthernityWallMessage;
  Keys: Keys;
  KnownAddresses: KnownAddresses;
  LastTicks: LastTicks;
  LegacyAccount: LegacyAccount;
  MultisigRegistration: MultisigRegistration;
  NetworkInfo: NetworkInfo;
  NetworkPeersStat: NetworkPeersStat;
  NetworkVersion: NetworkVersion;
  NodeInfo: NodeInfo;
  PaginatedBlock: PaginatedBlock;
  PaginatedEthernityWallMessage: PaginatedEthernityWallMessage;
  PaginatedRichListAccount: PaginatedRichListAccount;
  PaginatedTransaction: PaginatedTransaction;
  PaginatedTransactionLegacy: PaginatedTransactionLegacy;
  PaginatedTransactionOrLegacy:
    | ResolversParentTypes["PaginatedTransaction"]
    | ResolversParentTypes["PaginatedTransactionLegacy"];
  PaginatedVotes: PaginatedVotes;
  Pagination: Pagination;
  Peers: Peers;
  PomData: PomData;
  Promises: Promises;
  Query: {};
  ReceivedVotes: ReceivedVotes;
  RichList: RichList;
  RichListAccount: RichListAccount;
  Search: Search;
  SentVotes: SentVotes;
  Sequence: Sequence;
  StatElement: StatElement;
  StatKind: StatKind;
  Stats: Stats;
  TXStats: TxStats;
  Token: Token;
  TokenUnlock: TokenUnlock;
  Transaction: Transaction;
  TransactionLegacy: TransactionLegacy;
  TransactionSearch: TransactionSearch;
  TransactionWithBlock: TransactionWithBlock;
  TransactionWithBlockLegacy: TransactionWithBlockLegacy;
  TransactionWithBlockOrLegacy:
    | ResolversParentTypes["TransactionWithBlock"]
    | ResolversParentTypes["TransactionWithBlockLegacy"];
  TxKinds: TxKinds;
  Unlocking: Unlocking;
  Vote: Vote;
};

export type AccountResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Account"] = ResolversParentTypes["Account"]
> = {
  username?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  isDelegate?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  token?: Resolver<Maybe<ResolversTypes["Token"]>, ParentType, ContextType>;
  sequence?: Resolver<
    Maybe<ResolversTypes["Sequence"]>,
    ParentType,
    ContextType
  >;
  keys?: Resolver<Maybe<ResolversTypes["Keys"]>, ParentType, ContextType>;
  dpos?: Resolver<Maybe<ResolversTypes["Dpos"]>, ParentType, ContextType>;
  hexAddress?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  publicKey?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccountDelegateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AccountDelegate"] = ResolversParentTypes["AccountDelegate"]
> = {
  address?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  dpos?: Resolver<Maybe<ResolversTypes["Dpos"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccountSearchResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AccountSearch"] = ResolversParentTypes["AccountSearch"]
> = {
  username?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlockResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Block"] = ResolversParentTypes["Block"]
> = {
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  height?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  generatorPublicKey?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  reward?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  isFinal?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  finalized?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlockLegacyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["BlockLegacy"] = ResolversParentTypes["BlockLegacy"]
> = {
  isLegacy?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  height?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  timestamp?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  numberOfTransactions?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  totalAmount?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  totalFee?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  reward?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  generatorPublicKey?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  username?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlockLegacyForTransactionsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["BlockLegacyForTransactions"] = ResolversParentTypes["BlockLegacyForTransactions"]
> = {
  isLegacy?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  height?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  timestamp?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  numberOfTransactions?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  totalAmount?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  totalFee?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  reward?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  generatorPublicKey?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlockSearchResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["BlockSearch"] = ResolversParentTypes["BlockSearch"]
> = {
  id?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlockTransactionsOrLegacyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["BlockTransactionsOrLegacy"] = ResolversParentTypes["BlockTransactionsOrLegacy"]
> = {
  __resolveType: TypeResolveFn<
    "BlockWithTransactions" | "BlockLegacy",
    ParentType,
    ContextType
  >;
};

export type BlockWithTransactionsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["BlockWithTransactions"] = ResolversParentTypes["BlockWithTransactions"]
> = {
  block?: Resolver<Maybe<ResolversTypes["Block"]>, ParentType, ContextType>;
  transactions?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Transaction"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountriesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Countries"] = ResolversParentTypes["Countries"]
> = {
  country?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CurrencyDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CurrencyData"] = ResolversParentTypes["CurrencyData"]
> = {
  currency?: Resolver<
    Maybe<ResolversTypes["Currencies"]>,
    ParentType,
    ContextType
  >;
  date?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  value?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Float"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DelegateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Delegate"] = ResolversParentTypes["Delegate"]
> = {
  username?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  pomHeights?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Int"]>>>,
    ParentType,
    ContextType
  >;
  consecutiveMissedBlocks?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  lastForgedHeight?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  isBanned?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  totalVotesReceived?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  selfVotesAmount?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  rankAdjusted?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  isConsensusParticipant?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  minActiveHeight?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  nextForgingTime?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  producedBlocks?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  rank?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  consensusWeight?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DelegatesListResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["DelegatesList"] = ResolversParentTypes["DelegatesList"]
> = {
  delegates?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["AccountDelegate"]>>>,
    ParentType,
    ContextType
  >;
  total?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DelegatesWithStatsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["DelegatesWithStats"] = ResolversParentTypes["DelegatesWithStats"]
> = {
  locked?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  supply?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  delegates?: Resolver<
    Maybe<ResolversTypes["DelegatesList"]>,
    ParentType,
    ContextType
  >;
  promises?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Promises"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DposResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Dpos"] = ResolversParentTypes["Dpos"]
> = {
  delegate?: Resolver<
    Maybe<ResolversTypes["Delegate"]>,
    ParentType,
    ContextType
  >;
  sentVotes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SentVotes"]>>>,
    ParentType,
    ContextType
  >;
  receivedVotes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ReceivedVotes"]>>>,
    ParentType,
    ContextType
  >;
  unlocking?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Unlocking"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EthernityWallMessageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["EthernityWallMessage"] = ResolversParentTypes["EthernityWallMessage"]
> = {
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  moduleAssetId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  senderId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  senderUsername?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KeysResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Keys"] = ResolversParentTypes["Keys"]
> = {
  numberOfSignatures?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  mandatoryKeys?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  optionalKeys?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KnownAddressesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["KnownAddresses"] = ResolversParentTypes["KnownAddresses"]
> = {
  address?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  identifier?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  isExchange?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  isLiskHq?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  isScam?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  tag?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  balance?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LastTicksResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["LastTicks"] = ResolversParentTypes["LastTicks"]
> = {
  LSKUSD?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  LSKBTC?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  LSKEUR?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  LSKKRW?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  LSKPLN?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  LSKJPY?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  LSKCNY?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  LSKAED?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LegacyAccountResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["LegacyAccount"] = ResolversParentTypes["LegacyAccount"]
> = {
  username?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  balance?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  publicKey?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MultisigRegistrationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MultisigRegistration"] = ResolversParentTypes["MultisigRegistration"]
> = {
  numberOfSignatures?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  mandatoryKeys?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  optionalKeys?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NetworkInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["NetworkInfo"] = ResolversParentTypes["NetworkInfo"]
> = {
  stats?: Resolver<
    Maybe<ResolversTypes["NetworkPeersStat"]>,
    ParentType,
    ContextType
  >;
  peers?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Peers"]>>>,
    ParentType,
    ContextType
  >;
  countries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Countries"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NetworkPeersStatResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["NetworkPeersStat"] = ResolversParentTypes["NetworkPeersStat"]
> = {
  totalPeers?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  connectedPeers?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  disconnectedPeers?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  networkVersionDominant?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  networkVersion?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["NetworkVersion"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NetworkVersionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["NetworkVersion"] = ResolversParentTypes["NetworkVersion"]
> = {
  version?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  peers?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NodeInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["NodeInfo"] = ResolversParentTypes["NodeInfo"]
> = {
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedBlockResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PaginatedBlock"] = ResolversParentTypes["PaginatedBlock"]
> = {
  data?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Block"]>>>,
    ParentType,
    ContextType
  >;
  pagination?: Resolver<
    Maybe<ResolversTypes["Pagination"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedEthernityWallMessageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PaginatedEthernityWallMessage"] = ResolversParentTypes["PaginatedEthernityWallMessage"]
> = {
  data?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["EthernityWallMessage"]>>>,
    ParentType,
    ContextType
  >;
  pagination?: Resolver<
    Maybe<ResolversTypes["Pagination"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedRichListAccountResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PaginatedRichListAccount"] = ResolversParentTypes["PaginatedRichListAccount"]
> = {
  data?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["RichListAccount"]>>>,
    ParentType,
    ContextType
  >;
  pagination?: Resolver<
    Maybe<ResolversTypes["Pagination"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedTransactionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PaginatedTransaction"] = ResolversParentTypes["PaginatedTransaction"]
> = {
  data?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Transaction"]>>>,
    ParentType,
    ContextType
  >;
  pagination?: Resolver<
    Maybe<ResolversTypes["Pagination"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedTransactionLegacyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PaginatedTransactionLegacy"] = ResolversParentTypes["PaginatedTransactionLegacy"]
> = {
  data?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TransactionLegacy"]>>>,
    ParentType,
    ContextType
  >;
  pagination?: Resolver<
    Maybe<ResolversTypes["Pagination"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedTransactionOrLegacyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PaginatedTransactionOrLegacy"] = ResolversParentTypes["PaginatedTransactionOrLegacy"]
> = {
  __resolveType: TypeResolveFn<
    "PaginatedTransaction" | "PaginatedTransactionLegacy",
    ParentType,
    ContextType
  >;
};

export type PaginatedVotesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PaginatedVotes"] = ResolversParentTypes["PaginatedVotes"]
> = {
  data?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Vote"]>>>,
    ParentType,
    ContextType
  >;
  pagination?: Resolver<
    Maybe<ResolversTypes["Pagination"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Pagination"] = ResolversParentTypes["Pagination"]
> = {
  total?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  lastPage?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  currentPage?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  perPage?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PeersResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Peers"] = ResolversParentTypes["Peers"]
> = {
  connected?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  ipAddress?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  peerId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  networkVersion?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  height?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PomDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PomData"] = ResolversParentTypes["PomData"]
> = {
  address?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PromisesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Promises"] = ResolversParentTypes["Promises"]
> = {
  username?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  averageShared?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  address?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  promisedShare?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  block?: Resolver<
    Maybe<ResolversTypes["BlockTransactionsOrLegacy"]>,
    ParentType,
    ContextType,
    RequireFields<QueryBlockArgs, never>
  >;
  lastBlock?: Resolver<Maybe<ResolversTypes["Block"]>, ParentType, ContextType>;
  lastBlocks?: Resolver<
    Maybe<ResolversTypes["PaginatedBlock"]>,
    ParentType,
    ContextType,
    RequireFields<QueryLastBlocksArgs, never>
  >;
  blocksByAddress?: Resolver<
    Maybe<ResolversTypes["PaginatedBlock"]>,
    ParentType,
    ContextType,
    RequireFields<QueryBlocksByAddressArgs, "address">
  >;
  account?: Resolver<
    Maybe<ResolversTypes["Account"]>,
    ParentType,
    ContextType,
    RequireFields<QueryAccountArgs, "address">
  >;
  accountLegacy?: Resolver<
    Maybe<ResolversTypes["LegacyAccount"]>,
    ParentType,
    ContextType,
    RequireFields<QueryAccountLegacyArgs, "address">
  >;
  richList?: Resolver<
    Maybe<ResolversTypes["RichList"]>,
    ParentType,
    ContextType,
    RequireFields<QueryRichListArgs, never>
  >;
  transactionsByAddress?: Resolver<
    Maybe<ResolversTypes["PaginatedTransactionOrLegacy"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTransactionsByAddressArgs, "address" | "page">
  >;
  transaction?: Resolver<
    Maybe<ResolversTypes["TransactionWithBlockOrLegacy"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTransactionArgs, "id">
  >;
  transactions?: Resolver<
    Maybe<ResolversTypes["PaginatedTransaction"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTransactionsArgs, never>
  >;
  eternityWall?: Resolver<
    Maybe<ResolversTypes["PaginatedEthernityWallMessage"]>,
    ParentType,
    ContextType,
    RequireFields<QueryEternityWallArgs, never>
  >;
  txStats?: Resolver<Maybe<ResolversTypes["TXStats"]>, ParentType, ContextType>;
  whaleTransactions?: Resolver<
    Maybe<ResolversTypes["PaginatedTransaction"]>,
    ParentType,
    ContextType,
    RequireFields<QueryWhaleTransactionsArgs, "page">
  >;
  delegates?: Resolver<
    Maybe<ResolversTypes["DelegatesWithStats"]>,
    ParentType,
    ContextType
  >;
  liskVoteStats?: Resolver<
    Maybe<ResolversTypes["DelegatesWithStats"]>,
    ParentType,
    ContextType
  >;
  nodeInfo?: Resolver<
    Maybe<ResolversTypes["NodeInfo"]>,
    ParentType,
    ContextType
  >;
  search?: Resolver<
    Maybe<ResolversTypes["Search"]>,
    ParentType,
    ContextType,
    RequireFields<QuerySearchArgs, "term">
  >;
  getHistoricalPrices?: Resolver<
    Maybe<ResolversTypes["CurrencyData"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetHistoricalPricesArgs, never>
  >;
  lastTicks?: Resolver<
    Maybe<ResolversTypes["LastTicks"]>,
    ParentType,
    ContextType
  >;
  votes?: Resolver<
    Maybe<ResolversTypes["PaginatedVotes"]>,
    ParentType,
    ContextType,
    RequireFields<QueryVotesArgs, "page">
  >;
  knownAddresses?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["KnownAddresses"]>>>,
    ParentType,
    ContextType
  >;
  stats?: Resolver<Maybe<ResolversTypes["Stats"]>, ParentType, ContextType>;
  networkInfo?: Resolver<
    Maybe<ResolversTypes["NetworkInfo"]>,
    ParentType,
    ContextType
  >;
};

export type ReceivedVotesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ReceivedVotes"] = ResolversParentTypes["ReceivedVotes"]
> = {
  sender?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  senderUsername?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  amount?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RichListResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["RichList"] = ResolversParentTypes["RichList"]
> = {
  accounts?: Resolver<
    Maybe<ResolversTypes["PaginatedRichListAccount"]>,
    ParentType,
    ContextType
  >;
  supply?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RichListAccountResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["RichListAccount"] = ResolversParentTypes["RichListAccount"]
> = {
  address?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  balance?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  unlocked?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Search"] = ResolversParentTypes["Search"]
> = {
  accounts?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["AccountSearch"]>>>,
    ParentType,
    ContextType
  >;
  transactions?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TransactionSearch"]>>>,
    ParentType,
    ContextType
  >;
  blocks?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["BlockSearch"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SentVotesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SentVotes"] = ResolversParentTypes["SentVotes"]
> = {
  delegateAddress?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  delegateUsername?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  amount?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SequenceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Sequence"] = ResolversParentTypes["Sequence"]
> = {
  nonce?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatElementResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["StatElement"] = ResolversParentTypes["StatElement"]
> = {
  date?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  volume?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatKindResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["StatKind"] = ResolversParentTypes["StatKind"]
> = {
  historicalTXs?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["StatElement"]>>>,
    ParentType,
    ContextType
  >;
  totalCount?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  totalVolume?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  txKinds?: Resolver<Maybe<ResolversTypes["TxKinds"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Stats"] = ResolversParentTypes["Stats"]
> = {
  last24TXs?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  blocks?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  staked?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  supply?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  totalTransactions?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  totalTransactions30?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  lastDay?: Resolver<
    Maybe<ResolversTypes["StatKind"]>,
    ParentType,
    ContextType
  >;
  lastMonth?: Resolver<
    Maybe<ResolversTypes["StatKind"]>,
    ParentType,
    ContextType
  >;
  lastYear?: Resolver<
    Maybe<ResolversTypes["StatKind"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TxStatsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TXStats"] = ResolversParentTypes["TXStats"]
> = {
  lastDay?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Token"] = ResolversParentTypes["Token"]
> = {
  balance?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  locked?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenUnlockResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TokenUnlock"] = ResolversParentTypes["TokenUnlock"]
> = {
  delegateAddress?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  amount?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  unvoteHeight?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  username?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Transaction"] = ResolversParentTypes["Transaction"]
> = {
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  height?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  moduleAssetId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  nonce?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  blockId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  senderPublicKey?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  senderId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  recipientId?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  amount?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  fee?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  minFee?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  senderUsername?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  recipientUsername?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  votes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Vote"]>>>,
    ParentType,
    ContextType
  >;
  voteAmount?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  isFinalized?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionLegacyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TransactionLegacy"] = ResolversParentTypes["TransactionLegacy"]
> = {
  isLegacy?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  blockId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  senderPublicKey?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  senderId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  recipientId?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  amount?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  fee?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  signatures?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  data?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  asset?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  senderUsername?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  recipientUsername?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionSearchResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TransactionSearch"] = ResolversParentTypes["TransactionSearch"]
> = {
  id?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionWithBlockResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TransactionWithBlock"] = ResolversParentTypes["TransactionWithBlock"]
> = {
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  height?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  moduleAssetId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  nonce?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  blockId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  senderPublicKey?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  senderId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  recipientId?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  amount?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  fee?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  isFinalized?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  senderUsername?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  recipientUsername?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  blockHeight?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  blockTimestamp?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  blockGeneratorPublicKey?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  blockIsFinal?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  blockUsername?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  blockAddress?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  votes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Vote"]>>>,
    ParentType,
    ContextType
  >;
  multisigRegistration?: Resolver<
    Maybe<ResolversTypes["MultisigRegistration"]>,
    ParentType,
    ContextType
  >;
  tokenUnlock?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TokenUnlock"]>>>,
    ParentType,
    ContextType
  >;
  pomData?: Resolver<Maybe<ResolversTypes["PomData"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionWithBlockLegacyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TransactionWithBlockLegacy"] = ResolversParentTypes["TransactionWithBlockLegacy"]
> = {
  transaction?: Resolver<
    Maybe<ResolversTypes["TransactionLegacy"]>,
    ParentType,
    ContextType
  >;
  block?: Resolver<
    Maybe<ResolversTypes["BlockLegacyForTransactions"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionWithBlockOrLegacyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TransactionWithBlockOrLegacy"] = ResolversParentTypes["TransactionWithBlockOrLegacy"]
> = {
  __resolveType: TypeResolveFn<
    "TransactionWithBlock" | "TransactionWithBlockLegacy",
    ParentType,
    ContextType
  >;
};

export type TxKindsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TxKinds"] = ResolversParentTypes["TxKinds"]
> = {
  transfers?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  votes?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  poms?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  registerDelegate?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  unlockToken?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnlockingResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Unlocking"] = ResolversParentTypes["Unlocking"]
> = {
  delegateAddress?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  amount?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  unvoteHeight?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  delegateUsername?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VoteResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Vote"] = ResolversParentTypes["Vote"]
> = {
  delegateAddress?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  delegateUsername?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  amount?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  sentAddress?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  receivedAddress?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  senderUsername?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  recipientUsername?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Account?: AccountResolvers<ContextType>;
  AccountDelegate?: AccountDelegateResolvers<ContextType>;
  AccountSearch?: AccountSearchResolvers<ContextType>;
  Block?: BlockResolvers<ContextType>;
  BlockLegacy?: BlockLegacyResolvers<ContextType>;
  BlockLegacyForTransactions?: BlockLegacyForTransactionsResolvers<ContextType>;
  BlockSearch?: BlockSearchResolvers<ContextType>;
  BlockTransactionsOrLegacy?: BlockTransactionsOrLegacyResolvers<ContextType>;
  BlockWithTransactions?: BlockWithTransactionsResolvers<ContextType>;
  Countries?: CountriesResolvers<ContextType>;
  CurrencyData?: CurrencyDataResolvers<ContextType>;
  Delegate?: DelegateResolvers<ContextType>;
  DelegatesList?: DelegatesListResolvers<ContextType>;
  DelegatesWithStats?: DelegatesWithStatsResolvers<ContextType>;
  Dpos?: DposResolvers<ContextType>;
  EthernityWallMessage?: EthernityWallMessageResolvers<ContextType>;
  Keys?: KeysResolvers<ContextType>;
  KnownAddresses?: KnownAddressesResolvers<ContextType>;
  LastTicks?: LastTicksResolvers<ContextType>;
  LegacyAccount?: LegacyAccountResolvers<ContextType>;
  MultisigRegistration?: MultisigRegistrationResolvers<ContextType>;
  NetworkInfo?: NetworkInfoResolvers<ContextType>;
  NetworkPeersStat?: NetworkPeersStatResolvers<ContextType>;
  NetworkVersion?: NetworkVersionResolvers<ContextType>;
  NodeInfo?: NodeInfoResolvers<ContextType>;
  PaginatedBlock?: PaginatedBlockResolvers<ContextType>;
  PaginatedEthernityWallMessage?: PaginatedEthernityWallMessageResolvers<
    ContextType
  >;
  PaginatedRichListAccount?: PaginatedRichListAccountResolvers<ContextType>;
  PaginatedTransaction?: PaginatedTransactionResolvers<ContextType>;
  PaginatedTransactionLegacy?: PaginatedTransactionLegacyResolvers<ContextType>;
  PaginatedTransactionOrLegacy?: PaginatedTransactionOrLegacyResolvers<
    ContextType
  >;
  PaginatedVotes?: PaginatedVotesResolvers<ContextType>;
  Pagination?: PaginationResolvers<ContextType>;
  Peers?: PeersResolvers<ContextType>;
  PomData?: PomDataResolvers<ContextType>;
  Promises?: PromisesResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReceivedVotes?: ReceivedVotesResolvers<ContextType>;
  RichList?: RichListResolvers<ContextType>;
  RichListAccount?: RichListAccountResolvers<ContextType>;
  Search?: SearchResolvers<ContextType>;
  SentVotes?: SentVotesResolvers<ContextType>;
  Sequence?: SequenceResolvers<ContextType>;
  StatElement?: StatElementResolvers<ContextType>;
  StatKind?: StatKindResolvers<ContextType>;
  Stats?: StatsResolvers<ContextType>;
  TXStats?: TxStatsResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  TokenUnlock?: TokenUnlockResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  TransactionLegacy?: TransactionLegacyResolvers<ContextType>;
  TransactionSearch?: TransactionSearchResolvers<ContextType>;
  TransactionWithBlock?: TransactionWithBlockResolvers<ContextType>;
  TransactionWithBlockLegacy?: TransactionWithBlockLegacyResolvers<ContextType>;
  TransactionWithBlockOrLegacy?: TransactionWithBlockOrLegacyResolvers<
    ContextType
  >;
  TxKinds?: TxKindsResolvers<ContextType>;
  Unlocking?: UnlockingResolvers<ContextType>;
  Vote?: VoteResolvers<ContextType>;
};
