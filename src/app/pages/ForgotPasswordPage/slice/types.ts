import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface ForgotPasswordState {
  loading: boolean;
  error?: object;
  data: boolean;
  request: object | boolean;
  verify: {
    loading: boolean;
    error?: object;
    data: boolean;
    request: object | boolean;
  };
}

export type ContainerState = ForgotPasswordState;
