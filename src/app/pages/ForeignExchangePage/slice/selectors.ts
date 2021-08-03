import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) =>
  state.foreignExchange || initialState;

export const selectLoading = createSelector(
  [selectDomain],
  subState => subState.foreignExchange.loading,
);

export const selectError = createSelector(
  [selectDomain],
  subState => subState.foreignExchange.error,
);

export const selectForeignExchangeData = createSelector(
  [selectDomain],
  subState => subState.foreignExchange.data,
);
