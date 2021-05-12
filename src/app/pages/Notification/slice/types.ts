import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface NotificationsState {
  loading: boolean;
  error?: object;
  notifications: object | null;
}

export type ContainerState = NotificationsState;
