import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface AddMoneyBpiState {
  loading: boolean;
  error?: object;
  amount: any | null;
  bpiUrl: any;
  bpiUrlToken: any;
  accounts: any;
  accessToken: any;
  request: any;
  data: any;
  processData: any;
}

export type ContainerState = AddMoneyBpiState;
