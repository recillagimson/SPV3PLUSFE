import { TokenState, UserProfileState } from 'types/Default';

/* --- STATE --- */
export interface GlobalState {
  loading: boolean;
  error?: {} | boolean;
  data: {} | boolean;
  request: {} | boolean;
  login: string;
  user: UserProfileState | boolean;
  userToken: TokenState | string;
  isAuthenticated: boolean;
  isUnauthenticated: boolean;
  token: TokenState | string;
  isSessionExpired: boolean;
  isBlankPage: boolean;
  isServerError: boolean;
  references: {};
  tier: {} | boolean;
}
