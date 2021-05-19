import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { ComponentState, ErrorState } from './types';
import { componentSaga } from './saga';

export const initialState: ComponentState = {
  loading: false,
  error: {},
  data: false,
  request: false,
  otp: {
    loading: false,
    error: {},
    data: false,
    request: false,
  },
};

const slice = createSlice({
  name: 'profileSilver',
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
    getSendOTPLoading(state, action: PayloadAction<object>) {
      state.otp.loading = true;
      state.otp.error = {};
      state.otp.data = false;
      state.otp.request = action.payload;
    },
    getSendOTPSuccess(state, action: PayloadAction<boolean>) {
      state.otp.loading = false;
      state.otp.request = false;
      state.otp.data = action.payload;
    },
    getSendOTPError(state, action: PayloadAction<object>) {
      state.otp.loading = false;
      state.otp.request = false;
      state.otp.error = action.payload;
    },
    getSendOTPReset(state) {
      state.otp.loading = false;
      state.otp.error = {};
      state.otp.data = false;
      state.otp.request = false;
    },
  },
});

export const { actions: containerActions, reducer } = slice;

export const useComponentSaga = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: componentSaga });
  return { actions: slice.actions };
};
