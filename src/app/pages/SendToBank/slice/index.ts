import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { ContainerState, ErrorState } from './types';
import { containerSaga } from './saga';

export const initialState: ContainerState = {
  loading: false,
  error: {},
  data: [],
};

const slice = createSlice({
  name: 'sendToBank',
  initialState,
  reducers: {
    getPesonetBanksLoading(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = {};
      state.data = [];
      state.bankTransactionType = action.payload;
    },
    getPesonetBankSuccess(state, action: PayloadAction<[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    getPesonetBankError(state, action: PayloadAction<ErrorState>) {
      state.error = action.payload;
      state.loading = false;
    },
    getPesonetBankReset(state) {
      state.loading = false;
      state.error = {};
      state.data = [];
    },
  },
});

export const { actions: containerActions, reducer } = slice;

export const useContainerSaga = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: containerSaga });
  return { actions: slice.actions };
};