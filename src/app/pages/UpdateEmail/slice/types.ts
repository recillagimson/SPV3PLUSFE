import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface UpdateEmailState {
  loading: boolean;
  error?: {};
  data: boolean;
  request: {} | boolean;
  validate: {
    loading: boolean;
    error?: {};
    data: boolean;
    request: {} | boolean;
  };
  resend: {
    loading: boolean;
    error?: {};
    data: boolean;
    request: {} | boolean;
  };
}

export type ContainerState = UpdateEmailState;
