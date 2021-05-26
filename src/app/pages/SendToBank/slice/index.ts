import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { ContainerState, ErrorState } from './types';
import { containerSaga } from './saga';

export const initialState: ContainerState = {
  loading: false,
  error: {},
  data: [],
  purposes: [],
  validate: {},
  generateOTP: {},
  successSendTobank: {},
  bankTransactionType: '',
  formData: {},
};

const slice = createSlice({
  name: 'sendToBank',
  initialState,
  reducers: {
    getPurposesLoading(state) {
      state.loading = true;
      state.error = {};
      state.purposes = [];
    },
    getPurposesSuccess(state, action: PayloadAction<[]>) {
      state.loading = false;
      state.purposes = action.payload;
    },
    getPurposesError(state, action: PayloadAction<ErrorState>) {
      state.error = action.payload;
      state.loading = false;
      state.purposes = [];
    },
    getPurposesReset(state) {
      state.loading = false;
      state.error = {};
      state.purposes = [];
    },
    getBanksLoading(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = {};
      state.data = [];
      state.bankTransactionType = action.payload;
    },
    getBanksSuccess(state, action: PayloadAction<[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    getBanksError(state, action: PayloadAction<ErrorState>) {
      state.error = action.payload;
      state.loading = false;
    },
    getBanksReset(state) {
      state.loading = false;
      state.error = {};
      state.data = [];
    },
    validateBankLoading(state, action: PayloadAction<object>) {
      state.loading = true;
      state.error = {};
      state.validate = {};
      state.formData = action.payload;
    },
    validateBankSuccess(state, action: PayloadAction<object>) {
      state.loading = false;
      state.error = {};
      state.validate = action.payload;
    },
    validateBankError(state, action: PayloadAction<ErrorState>) {
      state.error = action.payload;
      state.loading = false;
      state.validate = {};
      state.formData = {};
    },
    generateSendToBankOTPLoading(state) {
      state.loading = true;
      state.error = {};
    },
    generateSendToBankOTPSuccess(state, action: PayloadAction<object>) {
      state.loading = false;
      state.error = {};
      state.generateOTP = action.payload;
    },
    generateSendToBankOTPError(state, action: PayloadAction<ErrorState>) {
      state.error = action.payload;
      state.loading = false;
      state.generateOTP = {};
    },
    sendToBankLoading(state) {
      state.loading = true;
      state.error = {};
    },
    sendToBankSuccess(state, action: PayloadAction<object>) {
      state.loading = false;
      state.error = {};
      state.successSendTobank = action.payload;
    },
    sendToBankError(state, action: PayloadAction<ErrorState>) {
      state.error = action.payload;
      state.loading = false;
      state.successSendTobank = {};
    },
    resetTransaction(state) {
      state.error = {};
      state.loading = false;
      state.formData = {};
      state.validate = {};
      state.generateOTP = {};
      state.successSendTobank = {};
    },
  },
});

export const { actions: containerActions, reducer } = slice;

export const useContainerSaga = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: containerSaga });
  return { actions: slice.actions };
};
