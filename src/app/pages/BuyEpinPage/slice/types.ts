import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface BuyEpinsState {
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

export type ContainerState = BuyEpinsState;
