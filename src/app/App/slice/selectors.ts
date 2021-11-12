import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.global || initialState;

export const selectUser = createSelector(
  [selectDomain],
  subState => subState.user,
);

export const selectLoggedInName = createSelector(
  [selectDomain],
  subState => subState.login,
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

export const setIsUnathenticated = createSelector(
  [selectDomain],
  subState => subState.isUnauthenticated,
);

export const selectClientToken = createSelector(
  [selectDomain],
  subState => subState.token,
);

export const selectUserToken = createSelector(
  [selectDomain],
  subState => subState.userToken,
);

export const selectIsBronze = createSelector(
  [selectDomain],
  subState => subState.isBronze,
);

export const selectIsUpgradeTier = createSelector(
  [selectDomain],
  subState => subState.isUpgradeTier,
);
/**
 * Use to display the proper OTP message
 */
export const selectOTPDetails = createSelector(
  [selectDomain],
  subState => subState.otp,
);

export const selectSessionExpired = createSelector(
  [selectDomain],
  subState => subState.isSessionExpired,
);

export const selectIsBlankPage = createSelector(
  [selectDomain],
  subState => subState.isBlankPage,
);

export const selectReferences = createSelector(
  [selectDomain],
  subState => subState.references,
);

export const selectUserTier = createSelector(
  [selectDomain],
  subState => subState.tier,
);

export const selectIsServerError = createSelector(
  [selectDomain],
  subState => subState.isServerError,
);
