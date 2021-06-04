import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { ComponentState } from './types';
import { componentSaga } from './saga';

export const initialState: ComponentState = {
  loading: false,
  error: false,
  data: false,
  request: false,
};

const slice = createSlice({
  name: 'updatePassword',
  initialState,
  reducers: {
    getFetchLoading(state, action: PayloadAction<object>) {
      state.loading = true;
      state.error = false;
      state.data = false;
      state.request = action.payload;
    },
    getFetchSuccess(state, action: PayloadAction<boolean>) {
      state.loading = false;
      state.request = false;
      state.data = action.payload;
    },
    getFetchError(state, action: PayloadAction<object | boolean>) {
      state.error = action.payload;
      state.loading = false;
    },
    getFetchReset(state) {
      state.loading = false;
      state.error = false;
      state.data = false;
      state.request = false;
    },
  },
});

export const { actions: componentActions, reducer } = slice;

export const useComponentSaga = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: componentSaga });
  return { actions: slice.actions };
};
