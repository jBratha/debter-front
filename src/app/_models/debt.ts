export class Debt {
  id: number;
  debtor: string;
  creditor: string;
  amount: string;
  description: string;
  status: DebtStatus;
  confirmedBy: string;
}

export enum DebtStatus {
  NOT_CONFIRMED = 'NOT_CONFIRMED',
  CONFIRMED = 'CONFIRMED',
  RESOLVED = 'RESOLVED'
}
