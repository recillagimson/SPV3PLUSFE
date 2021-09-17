import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.addMoneyBpi || initialState;

export const selectAmount = createSelector(
  [selectDomain],
  subState => subState.amount,
);

export const selectBpiUrl = createSelector(
  [selectDomain],
  subState => subState.bpiUrl,
);

export const selectBpiUrlToken = createSelector(
  [selectDomain],
  subState => subState.bpiUrlToken,
);

export const selectAccounts = createSelector(
  [selectDomain],
  subState => subState.accounts,
);

export const selectAccessToken = createSelector(
  [selectDomain],
  subState => subState.accessToken,
);

export const selectRequest = createSelector(
  [selectDomain],
  subState => subState.request,
);

export const selectData = createSelector(
  [selectDomain],
  subState => subState.data,
);

export const selectProcessData = createSelector(
  [selectDomain],
  subState => subState.processData,
);

export const selectLoading = createSelector(
  [selectDomain],
  subState => subState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  subState => subState.error,
);
