import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { ContainerState, ErrorState } from './types';
import { containerSaga } from './saga';

export const initialState: ContainerState = {
  loading: false,
  error: {},
  amount: null,
  addMoneyDragonpay: null,
};

const slice = createSlice({
  name: 'addMoneyDragonpay',
  initialState,
  reducers: {
    getFetchLoading(state, action: PayloadAction<number>) {
      state.loading = true;
      state.error = {};
      state.amount = action.payload;
    },
    getFetchSuccess(state, action: PayloadAction<object | null>) {
      state.loading = false;
      state.error = {};
      state.amount = null;
      state.addMoneyDragonpay = action.payload;
    },
    getFetchError(state, action: PayloadAction<ErrorState>) {
      state.error = action.payload;
      state.amount = null;
      state.loading = false;
    },
    getFetchReset(state) {
      state.loading = false;
      state.amount = null;
      state.error = {};
      state.addMoneyDragonpay = null;
    },
  },
});

export const { actions: containerActions, reducer } = slice;

export const useContainerSaga = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: containerSaga });
  return { actions: slice.actions };
};

// export {};
