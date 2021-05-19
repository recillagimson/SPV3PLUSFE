import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.profileSilver || initialState;

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

export const selectOTPData = createSelector(
  [selectDomain],
  subState => subState.otp.data,
);

export const selectOTPLoading = createSelector(
  [selectDomain],
  subState => subState.otp.loading,
);

export const selectOTPError = createSelector(
  [selectDomain],
  subState => subState.otp.error,
);

export const selectOTPRequest = createSelector(
  [selectDomain],
  subState => subState.otp.request,
);
