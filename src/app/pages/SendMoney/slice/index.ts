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
  validate: {
    loading: false,
    error: {},
    data: false,
    request: false,
  },
  generateCode: {
    loading: false,
    error: {},
    data: false,
    request: false,
  },
};

const slice = createSlice({
  name: 'sendMoney',
  initialState,
  reducers: {
    getFetchLoading(state, action: PayloadAction<object>) {
      state.loading = true;
      state.error = {};
      state.data = false;
      state.request = action.payload;
    },
    getFetchSuccess(state, action: PayloadAction<object>) {
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
    getValidateLoading(state, action: PayloadAction<object>) {
      state.validate.loading = true;
      state.validate.error = {};
      state.validate.data = false;
      state.validate.request = action.payload;
    },
    getValidateSuccess(state, action: PayloadAction<object>) {
      state.validate.loading = false;
      state.validate.request = false;
      state.validate.data = action.payload;
    },
    getValidateError(state, action: PayloadAction<ErrorState>) {
      state.validate.loading = false;
      state.validate.request = false;
      state.validate.error = action.payload;
    },
    getValidateReset(state) {
      state.validate.loading = false;
      state.validate.error = {};
      state.validate.data = false;
      state.validate.request = false;
    },
    getGenerateLoading(state, action: PayloadAction<object>) {
      state.generateCode.loading = true;
      state.generateCode.error = {};
      state.generateCode.data = false;
      state.generateCode.request = action.payload;
    },
    getGenerateSuccess(state, action: PayloadAction<boolean>) {
      state.generateCode.loading = false;
      state.generateCode.request = false;
      state.generateCode.data = action.payload;
    },
    getGenerateError(state, action: PayloadAction<ErrorState>) {
      state.generateCode.loading = false;
      state.generateCode.request = false;
      state.generateCode.error = action.payload;
    },
    getGenerateReset(state) {
      state.generateCode.loading = false;
      state.generateCode.error = {};
      state.generateCode.data = false;
      state.generateCode.request = false;
    },
  },
});

export const { actions: containerActions, reducer } = slice;

export const useContainerSaga = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: containerSaga });
  return { actions: slice.actions };
};
