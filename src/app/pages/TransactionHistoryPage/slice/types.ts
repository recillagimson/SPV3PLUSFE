import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface TransactionHistoryState {
  loading: boolean;
  error?: object;
  data: TransactionHistoryDataState[];
  transactionHistoryDetails: TransactionHistoryDetailsState;
  transactionHistoryDetailsError: object;
  transactionHistoryId: string;
}

export interface TransactionHistoryDataState {
  id: string;
  signed_total_amount: string;
  total_amount: string;
  created_at: string;
  transaction_category: object;
  transaction_id: string;
  transaction_type: string;
}

export interface TransactionHistoryDetailsState {
  bankName: string;
  accountName: string;
  accountNumber: string;
  transactionNumber: string;
  amount: string;
  signedAmount: string;
  serviceFee: string;
  purpose: string;
  transactionDate: string;
  transactionType: string;
}

export type ContainerState = TransactionHistoryState;
