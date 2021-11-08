import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { ContainerState, ErrorState } from './types';
import { containerSaga } from './saga';

export const initialState: ContainerState = {
  loading: false,
  error: {},
  amount: null,
  data: null,
};

const slice = createSlice({
  name: 'addMoneyECPay',
  initialState,
  reducers: {
    getFetchLoading(state, action: PayloadAction<object | null>) {
      state.loading = true;
      state.error = {};
      state.amount = action.payload;
    },
    getFetchSuccess(state, action: PayloadAction<object | null>) {
      state.loading = false;
      state.error = {};
      state.amount = null;
      state.data = action.payload;
    },
    getFetchError(state, action: PayloadAction<ErrorState>) {
      state.error = action.payload;
      state.loading = false;
    },
    getFetchReset(state) {
      state.loading = false;
      state.error = {};
      state.data = null;
      state.amount = null;
    },
  },
});

export const { actions: containerActions, reducer } = slice;

export const useContainerSaga = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: containerSaga });
  return { actions: slice.actions };
};
