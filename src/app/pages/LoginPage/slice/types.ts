import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface LoginState {
  loading: boolean;
  error?: object;
  data: object | boolean;
  request: object | boolean;
}

export type ContainerState = LoginState;
