import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) =>
  state.transactionHistory || initialState;

export const selectTransactionHistoryData = createSelector(
  [selectDomain],
  subState => subState.transactionHistory,
);

export const selectLoading = createSelector(
  [selectDomain],
  subState => subState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  subState => subState.error,
);

export const selectTransactionHistoryId = createSelector(
  [selectDomain],
  subState => subState.transactionHistoryId,
);

export const selectTransactionHistoryDetailsData = createSelector(
  [selectDomain],
  subState => subState.transactionHistoryDetails,
);
