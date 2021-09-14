import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.addMoneyBpi || initialState;

export const selectAmount = createSelector(
  [selectDomain],
  subState => subState.amount,
);

export const selectAddMoneyBpi = createSelector(
  [selectDomain],
  subState => subState.addMoneyBpi,
);

export const selectLoading = createSelector(
  [selectDomain],
  subState => subState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  subState => subState.error,
);
