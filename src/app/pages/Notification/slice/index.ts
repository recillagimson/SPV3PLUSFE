import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { ContainerState, ErrorState } from './types';
import { containerSaga } from './saga';

export const initialState: ContainerState = {
  loading: false,
  error: {},
  notifications: null,
};

const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    getFetchLoading(state) {
      state.loading = true;
      state.error = {};
    },
    getFetchSuccess(state, action: PayloadAction<object | null>) {
      state.loading = false;
      state.error = {};
      state.notifications = action.payload;
    },
    getFetchError(state, action: PayloadAction<ErrorState>) {
      console.log('BODY', action.payload);
      state.error = action.payload;
      state.loading = false;
    },
    getFetchReset(state, action: PayloadAction) {
      state.loading = false;
      state.error = {};
      state.notifications = {};
    },
  },
});

export const { actions: containerActions, reducer } = slice;

export const useContainerSaga = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: containerSaga });
  return { actions: slice.actions };
};

// export {};
