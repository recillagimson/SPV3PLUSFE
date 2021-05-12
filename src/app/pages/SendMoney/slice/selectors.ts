import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.sendMoney || initialState;

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

// Validate Send Money
export const selectValidateData = createSelector(
  [selectDomain],
  subState => subState.validate.data,
);

export const selectValidateLoading = createSelector(
  [selectDomain],
  subState => subState.validate.loading,
);

export const selectValidateError = createSelector(
  [selectDomain],
  subState => subState.validate.error,
);

export const selectValidateRequest = createSelector(
  [selectDomain],
  subState => subState.validate.request,
);

// Generate OTP Code
export const selectGenerateData = createSelector(
  [selectDomain],
  subState => subState.generateCode.data,
);

export const selectGenerateLoading = createSelector(
  [selectDomain],
  subState => subState.generateCode.loading,
);

export const selectGenerateError = createSelector(
  [selectDomain],
  subState => subState.generateCode.error,
);

export const selectGenerateRequest = createSelector(
  [selectDomain],
  subState => subState.generateCode.request,
);
