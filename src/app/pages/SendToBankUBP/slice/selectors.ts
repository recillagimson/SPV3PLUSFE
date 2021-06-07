import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.sendToBankUBP || initialState;

export const selectLoading = createSelector(
  [selectDomain],
  subState => subState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  subState => subState.error,
);

export const selectValidateTransaction = createSelector(
  [selectDomain],
  subState => subState.validate,
);

export const selectFormData = createSelector(
  [selectDomain],
  subState => subState.formData,
);

export const selectIsOTPSent = createSelector(
  [selectDomain],
  subState => subState.generateOTP,
);

export const selectSuccessToBank = createSelector(
  [selectDomain],
  subState => subState.successSendTobank,
);
