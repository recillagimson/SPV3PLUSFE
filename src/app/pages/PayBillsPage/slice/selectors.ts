import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.payBills || initialState;

export const selectBillers = createSelector(
  [selectDomain],
  subState => subState.billers,
);

export const selectLoading = createSelector(
  [selectDomain],
  subState => subState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  subState => subState.error,
);

export const selectBillerCode = createSelector(
  [selectDomain],
  subState => subState.billerCode,
);

export const selectFormData = createSelector(
  [selectDomain],
  subState => subState.formData,
);

export const selectValidatedBiller = createSelector(
  [selectDomain],
  subState => subState.validatePayBills,
);

export const selectCreatedPayBills = createSelector(
  [selectDomain],
  subState => subState.createdPayBills,
);
