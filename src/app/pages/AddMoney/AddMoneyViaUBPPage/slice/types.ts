import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface AddMoneyUbpState {
  loading: boolean;
  error?: object;
  amount: object | any;
  code: object | any;
  linkSuccess: boolean;
  cashInSuccess: object | boolean | any;
  authorizeUrl: string | any;
  request: object | any;
  data: object | any;
}

export type ContainerState = AddMoneyUbpState;
