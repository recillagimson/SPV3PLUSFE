import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { TokenState, UserProfileState } from 'types/Default';
import { GlobalState } from './types';
import { appSaga } from './saga';

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
  references: {},
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
    getClientTokenReset(state, action: PayloadAction) {
      state.loading = false;
      state.error = false;
      state.data = false;
      state.token = '';
    },
    getLoadUserProfile(state) {}, // an action only to dispatch retrieving of user profile
    getUserProfile(state, action: PayloadAction<UserProfileState>) {
      // write the proper OTP details for displaying of messages in verify otp
      // as per BE, if user email and mobile exists, mobile is the priority for sending OTP
      const u = action.payload; // user details
      let otp = {
        isEmail: false,
        value: '',
      };

      if (u && u.user_account) {
        otp.isEmail = !u.user_account.mobile;
        otp.value = !u.user_account.mobile
          ? u.user_account.email
          : u.user_account.mobile;
      }
      state.user = action.payload;
      state.otp = otp;
    },
    getSaveLoginName(state, action: PayloadAction<string>) {
      state.login = action.payload;
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
    getLoadReferences() {}, // an action only to dispatch retrieving of references
    getReferences(state, action: PayloadAction<object>) {
      state.references = action.payload;
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
