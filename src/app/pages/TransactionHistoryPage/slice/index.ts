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
  id: '',
  signed_total_amount: '',
  total_amount: '',
  transactable: {
    account_name: '',
    account_number: '',
    bank_name: '',
    created_at: '',
    amount: '',
    send_receipt_to: '',
    purpose: '',
    message: '',
    reference_number: '',
    service_fee: '',
    receiver_details: {
      first_name: '',
      last_name: '',
      middle_name: '',
    },
  },
  transaction_category: {
    description: '',
    name: '',
    title: '',
    transaction_type: '',
  },
  transactionDate: '',
  status: '',
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
  page: 1,
  transactionHistory: {},
  transactionHistoryDetails: transactionDetailsDefaultState,
  transactionHistoryDetailsError: {},
  transactionHistoryId: '',
};

const slice = createSlice({
  name: 'transactionHistory',
  initialState,
  reducers: {
    getFetchLoading(state, action: PayloadAction<number>) {
      state.loading = true;
      state.error = {};
      state.page = action.payload;
      state.transactionHistory = {};
    },
    getFetchSuccess(state, action: PayloadAction<[]>) {
      state.loading = false;
      state.transactionHistory = action.payload;
    },
    getFetchError(state, action: PayloadAction<ErrorState>) {
      state.error = action.payload;
      state.loading = false;
    },
    getFetchReset(state) {
      state.loading = false;
      state.error = {};
      state.transactionHistory = {};
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
