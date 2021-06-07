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
  resend: {
    loading: false,
    error: {},
    data: false,
    request: false,
  },
};

const slice = createSlice({
  name: 'updateEmail',
  initialState,
  reducers: {
    getFetchLoading(state, action: PayloadAction<any>) {
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
      state.request = false;
      state.loading = false;
    },
    getFetchReset(state) {
      state.loading = false;
      state.error = {};
      state.data = false;
      state.request = false;
    },
    getValidateLoading(state, action: PayloadAction<any>) {
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
      state.validate.error = action.payload;
      state.validate.request = false;
      state.validate.loading = false;
    },
    getValidateReset(state) {
      state.validate.loading = false;
      state.validate.error = {};
      state.validate.data = false;
      state.validate.request = false;
    },
    getResendLoading(state, action: PayloadAction<any>) {
      state.resend.loading = true;
      state.resend.error = {};
      state.resend.data = false;
      state.resend.request = action.payload;
    },
    getResendSuccess(state, action: PayloadAction<boolean>) {
      state.resend.loading = false;
      state.resend.request = false;
      state.resend.data = action.payload;
    },
    getResendError(state, action: PayloadAction<ErrorState>) {
      state.resend.error = action.payload;
      state.resend.request = false;
      state.resend.loading = false;
    },
    getResendReset(state) {
      state.resend.loading = false;
      state.resend.error = {};
      state.resend.data = false;
      state.resend.request = false;
    },
  },
});

export const { actions: containerActions, reducer } = slice;

export const useContainerSaga = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: containerSaga });
  return { actions: slice.actions };
};
