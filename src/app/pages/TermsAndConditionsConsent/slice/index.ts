import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { ContainerState, ErrorState } from './types';
import { containerSaga } from './saga';

export const initialState: ContainerState = {
  loading: false,
  error: {},
  termsAndConditionsData: null,
};

const slice = createSlice({
  name: 'termsAndConditions',
  initialState,
  reducers: {
    getFetchLoading(state) {
      state.loading = true;
      state.error = {};
    },
    getFetchSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = {};
      state.termsAndConditionsData = action.payload;
    },
    getFetchError(state, action: PayloadAction<ErrorState>) {
      state.error = action.payload;
      state.loading = false;
    },
    getFetchReset(state, action: PayloadAction) {
      state.loading = false;
      state.error = {};
      state.termsAndConditionsData = {};
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
