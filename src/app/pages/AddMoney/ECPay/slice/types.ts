import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface AddMoneyECPayState {
  loading: boolean;
  error?: object;
  amount: object | any;
  data: object | any;
}

export type ContainerState = AddMoneyECPayState;
