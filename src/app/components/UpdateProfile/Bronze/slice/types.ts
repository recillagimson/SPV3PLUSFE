import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface ProfileState {
  loading: boolean;
  error?: {};
  data: {} | boolean;
  request: {} | boolean;
}

export type ComponentState = ProfileState;
