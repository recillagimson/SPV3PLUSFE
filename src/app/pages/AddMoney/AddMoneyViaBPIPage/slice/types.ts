import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface AddMoneyBpiState {
  loading: boolean;
  error?: object;
  amount: object | any;
  bpiUrl: string | any;
  bpiUrlToken: string | any;
  accounts: object | any;
  accessToken: string | any;
  request: object | any;
  data: object | any;
  processData: object | any;
  otp: object | any;
}

export type ContainerState = AddMoneyBpiState;
