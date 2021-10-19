import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.addMoneyUbp || initialState;

export const selectAmount = createSelector(
  [selectDomain],
  subState => subState.amount,
);
export const selectCode = createSelector(
  [selectDomain],
  subState => subState.code,
);
export const selectLinkSuccess = createSelector(
  [selectDomain],
  subState => subState.linkSuccess,
);

export const selectAuthUrl = createSelector(
  [selectDomain],
  subState => subState.authorizeUrl,
);
export const selectCashInSuccess = createSelector(
  [selectDomain],
  subState => subState.cashInSuccess,
);

export const selectRequest = createSelector(
  [selectDomain],
  subState => subState.request,
);

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
