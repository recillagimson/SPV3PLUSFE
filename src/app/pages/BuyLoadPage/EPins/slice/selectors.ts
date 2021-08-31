import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.buyEpins || initialState;

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

export const selectPayData = createSelector(
  [selectDomain],
  subState => subState.pay.data,
);

export const selectPayLoading = createSelector(
  [selectDomain],
  subState => subState.pay.loading,
);

export const selectPayError = createSelector(
  [selectDomain],
  subState => subState.pay.error,
);

export const selectPayRequest = createSelector(
  [selectDomain],
  subState => subState.pay.request,
);
