import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import {
  ContainerState,
  TransactionHistoryDetailsState,
  ErrorState,
} from './types';
import { containerSaga } from './saga';

export const transactionDetailsDefaultState = {
  bankName: '',
  accountNumber: '',
  accountName: '',
  transactionNumber: '',
  amount: '',
  signedAmount: '',
  serviceFee: '',
  purpose: '',
  transactionDate: '',
  transactionType: '',
};

export const transactionHistoryDefaultState = {
  created_at: '',
  id: '',
  signed_total_amount: '',
  transaction_category: {
    title: '',
    transaction_type: '',
  },
};

export const initialState: ContainerState = {
  loading: false,
  error: {},
  data: [],
  transactionHistoryDetails: transactionDetailsDefaultState,
  transactionHistoryDetailsError: {},
  transactionHistoryId: '',
};

const slice = createSlice({
  name: 'transactionHistory',
  initialState,
  reducers: {
    getFetchLoading(state) {
      state.loading = true;
      state.error = {};
      state.data = [];
    },
    getFetchSuccess(state, action: PayloadAction<[]>) {
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
      state.data = [];
    },
    getTransactionHistoryDetailsLoading(state, action: PayloadAction<string>) {
      state.loading = true;
      state.transactionHistoryDetailsError = {};
      state.transactionHistoryDetails = transactionDetailsDefaultState;
      state.transactionHistoryId = action.payload;
    },
    getTransactionHistoryDetailsSuccess(
      state,
      action: PayloadAction<TransactionHistoryDetailsState>,
    ) {
      state.loading = false;
      state.transactionHistoryDetails = action.payload;
    },
    getTransactionHistoryDetailsError(
      state,
      action: PayloadAction<ErrorState>,
    ) {
      state.transactionHistoryDetailsError = action.payload;
      state.transactionHistoryId = '';
      state.loading = false;
    },
    getTransactionHistoryDetailsReset(state) {
      state.loading = false;
      state.transactionHistoryDetailsError = {};
      state.transactionHistoryDetails = transactionDetailsDefaultState;
      state.transactionHistoryId = '';
    },
  },
});

export const { actions: containerActions, reducer } = slice;

export const useContainerSaga = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: containerSaga });
  return { actions: slice.actions };
};
