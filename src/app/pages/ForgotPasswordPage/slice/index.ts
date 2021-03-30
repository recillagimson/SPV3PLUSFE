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
  verify: {
    loading: false,
    error: {},
    data: false,
    request: false,
  },
};

const slice = createSlice({
  name: 'forgotPassword',
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
      state.request = false;
      state.loading = false;
    },
    getFetchReset(state) {
      state.loading = false;
      state.error = {};
      state.data = false;
      state.request = false;
    },
    getVerifyLoading(state, action: PayloadAction<object>) {
      state.verify.loading = true;
      state.verify.error = {};
      state.verify.data = false;
      state.verify.request = action.payload;
    },
    getVerifySuccess(state, action: PayloadAction<boolean>) {
      state.verify.loading = false;
      state.verify.request = false;
      state.verify.data = action.payload;
    },
    getVerifyError(state, action: PayloadAction<ErrorState>) {
      state.verify.loading = false;
      state.verify.request = false;
      state.verify.error = action.payload;
    },
    getVerifyReset(state) {
      state.verify.loading = false;
      state.verify.error = {};
      state.verify.data = false;
      state.verify.request = false;
    },
  },
});

export const { actions: containerActions, reducer } = slice;

export const useContainerSaga = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: containerSaga });
  return { actions: slice.actions };
};
