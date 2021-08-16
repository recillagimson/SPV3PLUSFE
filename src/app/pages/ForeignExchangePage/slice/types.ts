import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface ForeignExchangeState {
  foreignExchange: {
    loading: boolean;
    error?: {};
    data: [] | boolean;
    request: {} | boolean;
  };
}

export type ContainerState = ForeignExchangeState;
