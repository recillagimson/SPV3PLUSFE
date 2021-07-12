import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { ContainerState } from './types';
import { containerSaga } from './saga';

export const initialState: ContainerState = {
  loading: false,
  error: '',
  data: {},
  request: false,
  validate: {
    loading: false,
    error: {},
    data: false,
    request: false,
  },
};

const slice = createSlice({
  name: 'tierUpgrade',
  initialState,
  reducers: {
    getFetchLoading(state) {
      state.loading = true;
      state.error = '';
      state.data = {};
    },
    getFetchSuccess(state, action: PayloadAction<object>) {
      state.loading = false;
      state.request = false;
      state.data = action.payload;
    },
    getFetchError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.request = false;
      state.loading = false;
    },
    getFetchReset(state) {
      state.loading = false;
      state.error = '';
      state.data = {};
      state.request = false;
    },
    getValidateLoading(state, action: PayloadAction<object>) {
      state.validate.loading = true;
      state.validate.error = {};
      state.validate.data = false;
      state.validate.request = action.payload;
    },
    getValidateSuccess(state, action: PayloadAction<boolean>) {
      state.validate.loading = false;
      state.validate.request = false;
      state.validate.data = action.payload;
    },
    getValidateError(state, action: PayloadAction<object>) {
      state.validate.error = action.payload;
      state.validate.request = false;
      state.validate.loading = false;
    },
    getValidateReset(state) {
      state.validate.loading = false;
      state.validate.error = {};
      state.validate.data = false;
      state.validate.request = false;
    },
  },
});

export const { actions: containerActions, reducer } = slice;

export const useContainerSaga = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: containerSaga });
  return { actions: slice.actions };
};
