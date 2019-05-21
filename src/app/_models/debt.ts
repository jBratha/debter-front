export class Debt {
  id: number;
  debtor: string;
  creditor: string;
  amount: number;
  description: string;
  status: DebtStatus;
  toConfirmBy: string;
  date: Date;
}

export enum DebtStatus {
  NOT_CONFIRMED = 'NOT_CONFIRMED',
  CONFIRMED = 'CONFIRMED',
  RESOLVED = 'RESOLVED',
  CONFIRMED_TO_BE_RESOLVED = 'CONFIRMED_TO_BE_RESOLVED'
}
