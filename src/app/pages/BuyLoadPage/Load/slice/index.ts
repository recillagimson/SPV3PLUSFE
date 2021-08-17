import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { ContainerState, ErrorState } from './types';
import { containerSaga } from './saga';

export const initialState: ContainerState = {
  loading: false,
  error: {},
  data: false,
  request: false,
  validate: {
    loading: false,
    error: {},
    data: false,
    request: false,
  },
  pay: {
    loading: false,
    error: {},
    data: false,
    request: false,
  },
};

const slice = createSlice({
  name: 'buyLoad',
  initialState,
  reducers: {
    getFetchLoading(state, action: PayloadAction<object>) {
      state.loading = true;
      state.error = {};
      state.data = false;
      state.request = action.payload;
    },
    getFetchSuccess(state, action: PayloadAction<object>) {
      state.loading = false;
      state.request = false;
      state.data = action.payload;
    },
    getFetchError(state, action: PayloadAction<ErrorState>) {
      state.error = action.payload;
      state.request = false;
      state.loading = false;
    },
    getFetchReset(state) {
      state.loading = false;
      state.error = {};
      state.data = false;
      state.request = false;
    },
    getValidateLoading(state, action: PayloadAction<object>) {
      state.validate.loading = true;
      state.validate.error = {};
      state.validate.data = false;
      state.validate.request = action.payload;
    },
    getValidateSuccess(state, action: PayloadAction<boolean>) {
      state.validate.loading = false;
      state.validate.request = false;
      state.validate.data = action.payload;
    },
    getValidateError(state, action: PayloadAction<ErrorState>) {
      state.validate.loading = false;
      state.validate.request = false;
      state.validate.error = action.payload;
    },
    getValidateReset(state) {
      state.validate.loading = false;
      state.validate.error = {};
      state.validate.data = false;
      state.validate.request = false;
    },
    getPayLoading(state, action: PayloadAction<object>) {
      state.pay.loading = true;
      state.pay.error = {};
      state.pay.data = false;
      state.pay.request = action.payload;
    },
    getPaySuccess(state, action: PayloadAction<object>) {
      state.pay.loading = false;
      state.pay.request = false;
      state.pay.data = action.payload;
    },
    getPayError(state, action: PayloadAction<ErrorState>) {
      state.pay.loading = false;
      state.pay.request = false;
      state.pay.error = action.payload;
    },
    getPayReset(state) {
      state.pay.loading = false;
      state.pay.error = {};
      state.pay.data = false;
      state.pay.request = false;
    },
  },
});

export const { actions: containerActions, reducer } = slice;

export const useContainerSaga = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: containerSaga });
  return { actions: slice.actions };
};
