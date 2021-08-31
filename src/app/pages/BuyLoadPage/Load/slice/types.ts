import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface BuyLoadState {
  loading: boolean;
  error?: object;
  data: object | boolean;
  request: object | boolean;
  validate: {
    loading: boolean;
    error?: object;
    data: object | boolean;
    request: object | boolean;
  };
  pay: {
    loading: boolean;
    error?: object;
    data: object | boolean;
    request: object | boolean;
  };
}

export type ContainerState = BuyLoadState;
