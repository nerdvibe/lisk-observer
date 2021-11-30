export enum TX_TYPES {
  TRANSACTION = "2:0",
  MULTISIG_REG = "4:0",
  REGISTER_DELEGATE = "5:0",
  VOTE = "5:1",
  TOKEN_UNLOCK = "5:2",
  POM_REPORT = "5:3",
  LEGACY_ADDRESS_CLAIM = "1000:0",
}
export enum TX_TYPE_NAMES {
  "2:0" = "Transaction",
  "4:0" = "Multisig Registration",
  "5:0" = "Register Delegate",
  "5:1" = "Vote",
  "5:2" = "Token unlock",
  "5:3" = "PoM Report",
  "1000:0" = "Legacy address claim",
}
export const MIN_SELF_VOTE_PERCENT = 10;
export const MIN_WEIGHT_STANDBY = 1000;
