export interface ChainAnalysisData {
  overall: Day;
  hour: Day;
  day: Day;
  week: Day;
  month: Day;
}

export interface Day {
  all: number;
  transfer: number;
  multisigregister: number;
  delegateregister: number;
  vote: number;
  tokenunlock: number;
  delegatemisbehavior: number;
  reclaimlsk: number;
  amounttransferredall: number;
  amounttransferredfromexchanges: number;
  amounttransferredtoexchanges: number;
  amounttransferrednonexchanges: number;
  activeaddresses: number;
  inactiveaddresses: number;
  totalrewards: number;
  totalfees: number;
  totalburned: number;
  topamountintransall: Topamountintrans[];
  topamountintranstoexchange: Topamountintrans[];
  topamountintransfromexchange: Topamountintrans[];
  topamountintransnonexchange: Topamountintrans[];
}

export interface Topamountintrans {
  height: number;
  id: string;
  transactionid: string;
  senderaddress: string;
  recipientaddress: string;
  timestamp: number;
  amount: number;
  exchange?: string;
}
