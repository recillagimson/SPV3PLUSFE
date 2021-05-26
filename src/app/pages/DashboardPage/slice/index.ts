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
  transaction: {
    loading: false,
    error: {},
    data: false,
    request: false,
  },
};

const slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    getFetchLoading(state) {
      state.loading = true;
      state.error = {};
    },
    getFetchSuccess(state, action: PayloadAction<object>) {
      state.loading = false;
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
    },
    getTransactionLoading(state) {
      state.transaction.loading = true;
      state.transaction.error = {};
    },
    getTransactionSuccess(state, action: PayloadAction<[]>) {
      state.transaction.loading = false;
      state.transaction.data = action.payload;
    },
    getTransactionError(state, action: PayloadAction<ErrorState>) {
      state.transaction.error = action.payload;
      state.transaction.loading = false;
    },
    getTransactionReset(state) {
      state.transaction.loading = false;
      state.transaction.error = {};
      state.transaction.data = false;
    },
  },
});

export const { actions: containerActions, reducer } = slice;

export const useContainerSaga = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: containerSaga });
  return { actions: slice.actions };
};
