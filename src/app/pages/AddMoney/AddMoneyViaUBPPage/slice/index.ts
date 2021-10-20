import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { ContainerState, ErrorState } from './types';
import { containerSaga } from './saga';

export const initialState: ContainerState = {
  loading: false,
  linkSuccess: false,
  error: {},
  code: null,
  amount: null,
  cashInSuccess: false,
  authorizeUrl: null,
  request: null,
  data: null,
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
      state.loading = false;
      state.cashInSuccess = action.payload;
    },
    getFetchError(state, action: PayloadAction<ErrorState>) {
      state.error = action.payload;
      state.loading = false;
    },
    getFetchReset(state) {
      state.loading = false;
      state.error = {};
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
    getLinkAccountLoading(state, action: PayloadAction<object | null>) {
      state.loading = false;
      state.error = {};
      state.code = action.payload;
    },
    getLinkAccountSuccess(state, action: PayloadAction<object | null>) {
      state.loading = false;
      state.error = {};
      state.linkSuccess = true;
      state.data = action.payload;
    },
    getLinkAccountError(state, action: PayloadAction<ErrorState>) {
      state.loading = false;
      state.error = {};
      state.linkSuccess = false;
      state.request = action.payload;
    },
    getTopUpReset(state) {
      state.loading = false;
      state.error = {};
      state.amount = null;
      state.data = null;
      state.request = null;
      state.code = null;
      state.linkSuccess = false;
      state.cashInSuccess = null;
      state.authorizeUrl = null;
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
