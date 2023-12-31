import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface TransactionHistoryState {
  loading: boolean;
  error?: object;
  page?: number;
  transactionHistory: object;
  transactionHistoryDetails: TransactionHistoryDetailsState;
  transactionHistoryDetailsError: object;
  transactionHistoryId: string;
  formData: object;
  requestTransactionHistory: object;
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
  id: string;
  signed_total_amount: string;
  total_amount: string;
  transactable: {
    account_name: string;
    account_number: string;
    bank_name: string;
    created_at: string;
    amount: string;
    send_receipt_to: string;
    purpose: string;
    message: string;
    reference_number: string;
    service_fee: string;
    other_charges: string;
    receiver_details: {
      first_name: string;
      last_name: string;
      middle_name: string;
    };
  };
  transaction_category: {
    description: string;
    name: string;
    title: string;
    transaction_type: string;
  };
  transactionDate: any;
  status: string;
}

export type ContainerState = TransactionHistoryState;
