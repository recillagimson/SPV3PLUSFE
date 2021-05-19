import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface ProfileBronzeState {
  loading: boolean;
  error?: {};
  data: {} | boolean;
  request: {} | boolean;
  otp: {
    loading: boolean;
    error?: {};
    data: boolean;
    request: {} | boolean;
  };
}

export type ComponentState = ProfileBronzeState;
