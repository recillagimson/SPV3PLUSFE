import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface SendToBankHistoryState {
  loading: boolean;
  error?: object;
  data: BankState[];
  purposes: [];
  bankTransactionType?: string;
  validate?: object;
  formData?: object;
}

export interface BankState {
  bank: string;
  code: string;
  brstn: string;
}

export type ContainerState = SendToBankHistoryState;
