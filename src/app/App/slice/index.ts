import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { TokenState, UserProfileState } from 'types/Default';
import { GlobalState, ReferenceTypes } from './types';
import { appSaga } from './saga';
import { validateEmail } from 'app/components/Helpers';

export const initialState: GlobalState = {
  loading: false,
  error: false,
  data: false,
  request: false,
  login: '',
  user: false,
  userToken: '',
  otp: {
    isEmail: false,
    value: '',
  },
  isAuthenticated: false,
  token: '',
  isUnauthenticated: false,
  isSessionExpired: false,
  isBlankPage: false,
  isServerError: false,
  references: {
    nationalities: false,
    countries: false,
    maritalStatus: false,
    natureOfWork: false,
    signUpHost: false,
    currency: false,
    sourceOfFunds: false,
  },
  tier: false,
};

const slice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    getClientTokenLoading(state, action: PayloadAction) {
      state.loading = true;
      state.error = false;
      state.data = false;
    },
    getClientTokenSuccess(state, action: PayloadAction<TokenState>) {
      state.loading = false;
      state.request = false;
      state.token = action.payload;
    },
    getClientTokenError(state, action: PayloadAction<TokenState>) {
      state.error = action.payload;
      state.loading = false;
    },
    getClientTokenReset(state) {
      state.loading = false;
      state.error = false;
      state.data = false;
      state.token = '';
    },
    getLoadUserProfile() {}, // an action only to dispatch retrieving of user profile
    getUserProfile(state, action: PayloadAction<UserProfileState>) {
      state.user = action.payload;
    },
    getSaveLoginName(state, action: PayloadAction<string>) {
      // write the proper OTP details for displaying of messages in verify otp
      // as per BE, OTP sending will be based on the login name

      const u = action.payload; // user details
      let otp = {
        isEmail: validateEmail(u),
        value: u,
      };

      state.login = action.payload;
      state.otp = otp;
    },
    getUserToken(state, action: PayloadAction<TokenState>) {
      state.userToken = action.payload;
    },
    getIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    getIsSessionExpired(state, action: PayloadAction<boolean>) {
      state.isSessionExpired = action.payload;
    },
    getIsUnauthenticated(state, action: PayloadAction<boolean>) {
      state.isUnauthenticated = action.payload;
    },
    getIsBlankPage(state, action: PayloadAction<boolean>) {
      state.isBlankPage = action.payload;
    },
    getIsServerError(state, action: PayloadAction<boolean>) {
      state.isServerError = action.payload;
    },
    getLoadAllReferences() {}, // an action only to dispatch retrieving of all references
    getSaveAllReferences(state, action: PayloadAction<ReferenceTypes>) {
      state.references = action.payload;
    },
    getLoadMaritalRef() {},
    getLoadNationalityRef() {},
    getLoadCountryRef() {},
    getLoadCurrencyRef() {},
    getLoadNatureOfWorkRef() {},
    getLoadSourceOfFundsRef() {},
    getLoadSignUpHostRef() {},
    getSaveReferences(
      state,
      action: PayloadAction<{ key: string; data: any }>,
    ) {
      const key = action.payload.key;
      state.references[key] = action.payload.data;
    },
    getSaveTier(state, action: PayloadAction<object>) {
      state.tier = action.payload;
    },
  },
});

export const { actions: appActions, reducer } = slice;

export const useAppSaga = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: appSaga });
  return { actions: slice.actions };
};
