import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.forgotPassword || initialState;

export const selectData = createSelector(
  [selectDomain],
  subState => subState.data,
);

export const selectLoading = createSelector(
  [selectDomain],
  subState => subState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  subState => subState.error,
);

export const selectRequest = createSelector(
  [selectDomain],
  subState => subState.request,
);

export const selectVerifyData = createSelector(
  [selectDomain],
  subState => subState.data,
);

export const selectVerifyLoading = createSelector(
  [selectDomain],
  subState => subState.loading,
);

export const selectVerifyError = createSelector(
  [selectDomain],
  subState => subState.error,
);

export const selectVerifyRequest = createSelector(
  [selectDomain],
  subState => subState.request,
);
