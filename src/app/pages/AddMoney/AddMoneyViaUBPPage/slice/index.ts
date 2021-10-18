import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { ContainerState, ErrorState } from './types';
import { containerSaga } from './saga';

export const initialState: ContainerState = {
  loading: false,
  error: {},
  amount: null,
  authorizeUrl: null,
  accounts: null,
  request: null,
  data: null,
  processData: null,
  otp: null,
};

const slice = createSlice({
  name: 'addMoneyUbp',
  initialState,
  reducers: {
    getFetchLoading(state, action: PayloadAction<object | null>) {
      state.loading = true;
      state.error = {};
      state.amount = action.payload;
    },
    getFetchSuccess(state, action: PayloadAction<object | null>) {
      state.error = {};
      state.amount = null;
    },
    getGenerateAuthUrlLoading(state) {
      state.loading = true;
      state.error = {};
      state.authorizeUrl = null;
    },
    getGenerateAuthUrlSuccess(state, action: PayloadAction<string | any>) {
      state.loading = false;
      state.error = {};
      state.authorizeUrl = action.payload;
    },
    getGenerateAuthUrlError(state, action: PayloadAction<ErrorState>) {
      state.loading = false;
      state.error = action.payload;
    },
    getFetchAccountsSuccess(state, action: PayloadAction<object | null>) {
      state.loading = false;
      state.error = {};
      state.accounts = action.payload;
    },
    getFetchFundTopUpLoading(state, action: PayloadAction<object | null>) {
      state.loading = true;
      state.error = {};
      state.request = action.payload;
    },
    getFetchFundTopUpSuccess(state, action: PayloadAction<object | null>) {
      state.loading = false;
      state.error = {};
      state.data = action.payload;
    },
    getFetchProcessTopUpLoading(state, action: PayloadAction<object | null>) {
      state.loading = true;
      state.error = {};
      state.request = action.payload;
    },
    getFetchProcessTopUpSuccess(state, action: PayloadAction<object | null>) {
      state.loading = false;
      state.error = {};
      state.processData = action.payload;
    },
    getFetchResendOTPLoading(state, action: PayloadAction<object | null>) {
      state.loading = true;
      state.error = {};
      state.request = action.payload;
    },
    getFetchResendOTPSuccess(state, action: PayloadAction<object | null>) {
      state.loading = false;
      state.error = {};
      state.otp = action.payload;
    },
    getProcessTopUpReset(state) {
      state.loading = false;
      state.error = {};
      state.amount = null;
      state.accounts = null;
      state.data = null;
      state.processData = null;
      state.request = null;
    },
    getFetchError(state, action: PayloadAction<ErrorState>) {
      state.error = action.payload;
      state.loading = false;
    },
    getFetchReset(state) {
      state.loading = false;
      state.error = {};
    },
    getFetchRedirectLoading(state) {
      state.loading = true;
      state.error = {};
    },
  },
});

export const { actions: containerActions, reducer } = slice;

export const useContainerSaga = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: containerSaga });
  return { actions: slice.actions };
};
