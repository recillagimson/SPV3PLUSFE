import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface AddMoneyUbpState {
  loading: boolean;
  error?: object;
  amount: object | any;
  authorizeUrl: string | any;
  accounts: object | any;
  request: object | any;
  data: object | any;
  processData: object | any;
  otp: object | any;
}

export type ContainerState = AddMoneyUbpState;
