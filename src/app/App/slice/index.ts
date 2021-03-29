import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { ClientTokenState } from 'types/Default';
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
  isSessionExpired: false,
};

const slice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    getTokenLoading(state, action: PayloadAction) {
      state.loading = true;
      state.error = false;
      state.data = false;
    },
    getTokenSuccess(state, action: PayloadAction<ClientTokenState>) {
      state.loading = false;
      state.request = false;
      state.token = action.payload;
    },
    getTokenError(state, action: PayloadAction<ClientTokenState>) {
      state.error = action.payload;
      state.loading = false;
    },
    getTokenReset(state, action: PayloadAction) {
      state.loading = false;
      state.error = false;
      state.data = false;
    },
    getIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    getIsSessionExpired(state, action: PayloadAction<boolean>) {
      state.isSessionExpired = action.payload;
    },
  },
});

export const { actions: appActions, reducer } = slice;

export const useAppSaga = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: appSaga });
  return { actions: slice.actions };
};
