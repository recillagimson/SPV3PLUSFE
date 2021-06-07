import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { BillersState, ContainerState, ErrorState } from './types';
import { containerSaga } from './saga';

export const initialState: ContainerState = {
  loading: false,
  error: {},
  billers: [],
  billerCode: '',
  formData: {},
  validatePayBills: {},
  createdPayBills: {},
};

const slice = createSlice({
  name: 'payBills',
  initialState,
  reducers: {
    getBillersLoading(state) {
      state.loading = true;
      state.error = {};
      state.billers = [];
      state.billerCode = '';
    },
    getBillersSuccess(state, action: PayloadAction<BillersState[]>) {
      state.loading = false;
      state.billers = action.payload;
    },
    getBillersError(state, action: PayloadAction<ErrorState>) {
      state.error = action.payload;
      state.loading = false;
    },
    getBillersReset(state) {
      state.loading = false;
      state.error = {};
      state.billers = [];
    },
    setBillerCode(state, action: PayloadAction<string>) {
      state.billerCode = action.payload;
    },
    validatePayBillsLoading(state, action: PayloadAction<object>) {
      state.loading = true;
      state.error = {};
      state.formData = action.payload;
    },
    validatePayBillsSuccess(state, action: PayloadAction<BillersState[]>) {
      state.loading = false;
      state.validatePayBills = action.payload;
    },
    validatePayBillsError(state, action: PayloadAction<ErrorState>) {
      state.error = action.payload;
      state.loading = false;
    },
    createPayBillsLoading(state) {
      state.loading = true;
      state.error = {};
    },
    createPayBillsSuccess(state, action: PayloadAction<object>) {
      state.loading = false;
      state.createdPayBills = action.payload;
    },
    createPayBillsError(state, action: PayloadAction<ErrorState>) {
      state.error = action.payload;
      state.loading = false;
    },
    clear(state) {
      state.error = {};
      state.loading = false;
      state.validatePayBills = {};
      state.createdPayBills = {};
      state.formData = {};
    },
  },
});

export const { actions: containerActions, reducer } = slice;

export const useContainerSaga = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: containerSaga });
  return { actions: slice.actions };
};
