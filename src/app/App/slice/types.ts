import { ClientTokenState } from 'types/Default';

/* --- STATE --- */
export interface GlobalState {
  loading: boolean;
  error?: Object | boolean;
  data: Object | boolean;
  request: Object | boolean;
  user: Object | boolean;
  userToken: ClientTokenState | string;
  isAuthenticated: boolean;
  token: ClientTokenState | string;
  isSessionExpired: boolean;
  isBlankPage: boolean;
  references: {};
}
