import { TokenState, UserProfileState } from 'types/Default';

/* --- STATE --- */
export interface GlobalState {
  loading: boolean;
  error?: {} | boolean;
  data: {} | boolean;
  request: {} | boolean;
  login: string;
  user: UserProfileState | boolean;
  isBronze: boolean;
  userToken: TokenState | string;
  otp: {
    isEmail: boolean;
    value: string;
  };
  isAuthenticated: boolean;
  isUnauthenticated: boolean;
  token: TokenState | string;
  isSessionExpired: boolean;
  isBlankPage: boolean;
  isServerError: boolean;
  isUpgradeTier: boolean;
  references: ReferenceTypes;
  tier: {} | boolean;
}

export type ReferenceTypes =
  | {}
  | {
      nationalities: any;
      countries: any;
      maritalStatus: any;
      natureOfWork: any;
      signUpHost: any;
      currency: any;
      sourceOfFunds: any;
    };
