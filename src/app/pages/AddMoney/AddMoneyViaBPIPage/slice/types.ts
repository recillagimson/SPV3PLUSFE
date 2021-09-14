import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface AddMoneyBpiState {
  loading: boolean;
  error?: object;
  amount: any | null;
  addMoneyBpi: any;
}

export type ContainerState = AddMoneyBpiState;
