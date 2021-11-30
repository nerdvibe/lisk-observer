export interface Vote {
  delegateAddress: string;
  delegateUsername: string;
  amount: string;
}
export interface MultisigRegistration {
  numberOfSignatures: number;
  mandatoryKeys: string[];
  optionalKeys: string[];
}
export interface TokenUnlock {
  delegateAddress: string;
  amount: string;
  unvoteHeight: string;
  username: string;
}

export interface PomData {
  address: string;
  username: string;
}

export interface Transaction {
  id: string;
  height: string;
  moduleAssetId: string;
  nonce: string;
  blockId: string;
  timestamp: string;
  senderPublicKey: string;
  senderId: string;
  recipientPublicKey?: string;
  recipientId?: string;
  amount: string;
  fee: string;
  data?: string;
  votes?: Vote[];
  senderUsername?: string;
  recipientUsername?: string;
  multisigRegistration?: MultisigRegistration;
  tokenUnlock?: TokenUnlock[];
  pomData?: PomData;
  isFinalized: boolean;
}

export interface TransactionWithBlock extends Transaction {
  blockHeight: string;
  blockTimestamp: string;
  blockGeneratorPublicKey: string;
  blockIsFinal: boolean;
  blockUsername: string;
  blockAddress: string;
}
