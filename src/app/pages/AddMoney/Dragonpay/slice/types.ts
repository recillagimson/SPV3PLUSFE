import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface AddMoneyDragonpayState {
  loading: boolean;
  error?: object;
  amount: number | null;
  addMoneyDragonpay: object | null;
}

export type ContainerState = AddMoneyDragonpayState;
