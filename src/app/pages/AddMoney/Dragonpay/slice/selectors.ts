import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './';

// First select the relevant part from the state
const selectDomain = (state: RootState) =>
  state.addMoneyDragonpay || initialState;

export const selectAmount = createSelector(
  [selectDomain],
  subState => subState.amount,
);

export const selectAddMoneyDragonpay = createSelector(
  [selectDomain],
  subState => subState.addMoneyDragonpay,
);

export const selectLoading = createSelector(
  [selectDomain],
  subState => subState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  subState => subState.error,
);
// export {};
