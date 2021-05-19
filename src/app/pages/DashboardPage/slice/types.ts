import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface DashboardState {
  loading: boolean;
  error?: {};
  data: {} | boolean;
  request: {} | boolean;
  transaction: {
    loading: boolean;
    error?: {};
    data: [] | boolean;
    request: {} | boolean;
  };
}

export type ContainerState = DashboardState;
