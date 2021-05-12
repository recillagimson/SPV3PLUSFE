import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface SendToBankHistoryState {
  loading: boolean;
  error?: object;
  data: [];
  bankTransactionType?: string;
}

export type ContainerState = SendToBankHistoryState;
