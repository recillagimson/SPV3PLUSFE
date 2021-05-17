import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface ChangePasswordState {
  loading: boolean;
  error?: string;
  data: boolean;
  request: object | boolean;
  validate: {
    loading: boolean;
    error?: string;
    data: boolean;
    request: object | boolean;
  };
}

export type ContainerState = ChangePasswordState;
