import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface HelpCenterState {
  loading: boolean;
  error?: object;
  data: object;
  request: object | boolean;
}

export type ContainerState = HelpCenterState;
