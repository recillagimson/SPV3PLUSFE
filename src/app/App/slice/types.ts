import { ClientTokenState } from 'types/Default';

/* --- STATE --- */
export interface GlobalState {
  loading: boolean;
  error?: object | boolean;
  data: object | boolean;
  request: object | boolean;
  user: object | boolean;
  isAuthenticated: boolean;
  token: ClientTokenState | string;
  isSessionExpired: boolean;
  isBlankPage: boolean;
}
