import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.global || initialState;

export const selectUser = createSelector(
  [selectDomain],
  subState => subState.user,
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

export const selectRequest = createSelector(
  [selectDomain],
  subState => subState.request,
);

export const selectIsAuthenticated = createSelector(
  [selectDomain],
  subState => subState.isAuthenticated,
);

export const selectClientToken = createSelector(
  [selectDomain],
  subState => subState.token,
);

export const selectUserToken = createSelector(
  [selectDomain],
  subState => subState.userToken,
);

export const selectSessionExpired = createSelector(
  [selectDomain],
  subState => subState.isSessionExpired,
);

export const selectIsBlankPage = createSelector(
  [selectDomain],
  subState => subState.isBlankPage,
);
