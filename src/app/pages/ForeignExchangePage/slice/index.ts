import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { ContainerState, ErrorState } from './types';
import { containerSaga } from './saga';

export const initialState: ContainerState = {
  foreignExchange: {
    loading: false,
    error: {},
    data: false,
    request: false,
  },
};

const slice = createSlice({
  name: 'foreignExchange',
  initialState,
  reducers: {
    getForeignExchangeLoading(state) {
      state.foreignExchange.loading = true;
      state.foreignExchange.error = {};
    },
    getForeignExchangeSuccess(state, action: PayloadAction<[]>) {
      state.foreignExchange.loading = false;
      state.foreignExchange.data = action.payload;
    },
    getForeignExchangeError(state, action: PayloadAction<ErrorState>) {
      state.foreignExchange.error = action.payload;
      state.foreignExchange.loading = false;
    },
    getForeignExchangeReset(state) {
      state.foreignExchange.loading = false;
      state.foreignExchange.error = {};
      state.foreignExchange.data = false;
    },
  },
});

export const { actions: containerActions, reducer } = slice;

export const useContainerSaga = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: containerSaga });
  return { actions: slice.actions };
};
