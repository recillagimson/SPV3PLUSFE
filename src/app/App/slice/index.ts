import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { GlobalState } from './types';
import { appSaga } from './saga';

export const initialState: GlobalState = {
  loading: false,
  error: false,
  data: false,
  request: false,
  user: false,
  isAuthenticated: false,
  token: '',
};

const slice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    getFetchLoading(state, action: PayloadAction<object | boolean>) {
      state.loading = true;
      state.error = false;
      state.data = false;
      state.request = action.payload;
    },
    getFetchSuccess(state, action: PayloadAction<object>) {
      state.loading = false;
      state.request = false;
      state.user = action.payload;
    },
    getFetchError(state, action: PayloadAction<object>) {
      state.error = action.payload;
      state.loading = false;
    },
    getFetchReset(state, action: PayloadAction) {
      state = initialState;
    },
  },
});

export const { actions: appActions, reducer } = slice;

export const useAppSaga = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: appSaga });
  return { actions: slice.actions };
};
