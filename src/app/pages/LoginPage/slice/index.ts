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
  resendCode: {
    loading: false,
    error: {},
    data: false,
    request: false,
  },
};

const slice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    getFetchLoading(state, action: PayloadAction<object>) {
      state.loading = true;
      state.error = {};
      state.data = false;
      state.request = action.payload;
    },
    getFetchSuccess(state, action: PayloadAction<boolean>) {
      state.loading = false;
      state.request = false;
      state.data = action.payload;
    },
    getFetchError(state, action: PayloadAction<ErrorState>) {
      state.error = action.payload;
      state.loading = false;
    },
    getFetchReset(state) {
      state.loading = false;
      state.error = {};
      state.data = false;
      state.request = false;
    },
    getResendCodeLoading(state, action: PayloadAction<object>) {
      state.resendCode.loading = true;
      state.resendCode.error = {};
      state.resendCode.data = false;
      state.resendCode.request = action.payload;
    },
    getResendCodeSuccess(state, action: PayloadAction<boolean>) {
      state.resendCode.loading = false;
      state.resendCode.request = false;
      state.resendCode.data = action.payload;
    },
    getResendCodeError(state, action: PayloadAction<object>) {
      state.resendCode.loading = false;
      state.resendCode.request = false;
      state.resendCode.error = action.payload;
    },
    getResendCodeReset(state) {
      state.resendCode.loading = false;
      state.resendCode.error = {};
      state.resendCode.data = false;
      state.resendCode.request = false;
    },
  },
});

export const { actions: containerActions, reducer } = slice;

export const useContainerSaga = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: containerSaga });
  return { actions: slice.actions };
};
