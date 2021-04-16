import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.login || initialState;

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

export const selectResendCodeData = createSelector(
  [selectDomain],
  subState => subState.resendCode.data,
);

export const selectResendCodeLoading = createSelector(
  [selectDomain],
  subState => subState.resendCode.loading,
);

export const selectResendCodeError = createSelector(
  [selectDomain],
  subState => subState.resendCode.error,
);

export const selectResendCodeRequest = createSelector(
  [selectDomain],
  subState => subState.resendCode.request,
);
