import { call, select, takeLatest, put, delay } from 'redux-saga/effects';
import { request } from 'utils/request';

import spdCrypto from 'app/components/Helpers/EncyptDecrypt';

import { getCookie, setCookie } from 'app/components/Helpers';

import { TokenState, PassphraseState } from 'types/Default';
import { appActions as actions } from '.';
import { selectClientToken, selectUserToken } from './selectors';
import {
  getMaritalStatus,
  getNatureOfWork,
  getNationalities,
  getCountries,
  getSignUpHost,
  getCurrencies,
  getSourceOfFunds,
} from './references';

/**
 * Global function for user data or other data
 */
export function* getRequestToken() {
  const client_id = process.env.REACT_APP_CLIENT_ID || '';
  const client_secret = process.env.REACT_APP_CLIENT_SECRET || '';

  // payload URL params
  const payload = new URLSearchParams();
  payload.append('client_id', client_id);
  payload.append('client_secret', client_secret);

  const requestURL = `${process.env.REACT_APP_API_URL}/clients/token`;

  const options = {
    method: 'POST',
    headers: {
      Accept: 'applications/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: payload,
  };

  try {
    const apirequest: TokenState = yield call(request, requestURL, options);

    if (apirequest && apirequest.expires_in) {
      const now = new Date();
      now.setSeconds(now.getSeconds() + apirequest.expires_in);

      setCookie('spv_cat', JSON.stringify(apirequest), 0);
      setCookie('spv_expire', now.toUTCString(), 0);

      yield put(actions.getClientTokenSuccess(apirequest));
    }

    if (apirequest && apirequest.errors) {
      yield put(actions.getClientTokenError(apirequest));
    }

    return apirequest;
  } catch (err) {
    yield put(actions.getClientTokenError(err));
    return err;
  }
}

/**
 * Call to get a request passphrase for encryption
 * @return                 Returns the result from the api call
 */
export function* getRequestPassphrase() {
  yield delay(500);
  let token: any;

  // check if we have a cookie set
  const spvExpireCookie = getCookie('spv_expire');
  if (spvExpireCookie && spvExpireCookie !== '') {
    const now = new Date();
    const tokenExpire = new Date(spvExpireCookie);
    if (now.getTime() > tokenExpire.getTime()) {
      token = yield call(getRequestToken);
    } else {
      token = yield select(selectClientToken);
    }
  } else {
    token = yield select(selectClientToken);
  }

  const requestURL = `${process.env.REACT_APP_API_URL}/payloads/generate`;

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${token.access_token}`,
    },
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    // returns the request result
    return apirequest;
  } catch (err) {
    return err;
  }
}

/**
 * Get a response passphrase for decryption
 * @param {string}  id    request passphrase id
 * @return                Returns the result from the api call
 */
export function* getResponsePassphrase(id: string) {
  yield delay(500);
  const token = yield select(selectClientToken);
  const requestURL = `${process.env.REACT_APP_API_URL}/payloads/${id}/key`;

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${token.access_token}`,
    },
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    // returns the request result
    return apirequest;
  } catch (err) {
    return err;
  }
}

/**
 * Retrieve Logged In User Profile
 * For use on the whole app
 */
export function* getLoggedInUserProfile() {
  yield delay(500);

  const token = yield select(selectUserToken);
  const requestURL = `${process.env.REACT_APP_API_URL}/user/profile`;

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${token.access_token}`,
    },
  };

  try {
    const apirequest = yield call(request, requestURL, options);

    // returns the request result
    if (apirequest && apirequest.data) {
      let decryptPhrase: PassphraseState = yield call(
        getResponsePassphrase,
        apirequest.data.id,
      );

      // decrypt payload data
      // function returns the parsed string
      let decryptData = spdCrypto.decrypt(
        apirequest.data.payload,
        decryptPhrase.passPhrase,
      );

      yield put(actions.getUserProfile(decryptData));
      return decryptData || true;
    }
  } catch (err) {
    if (err && err.response && err.response.status === 401) {
      yield put(actions.getIsSessionExpired(true));
    }
    return false;
  }
}

/**
 * Retrieve the necessary references for use in the app
 */
export function* getUserReferences() {
  yield delay(1000);
  let refs = {};

  const maritalStatus = yield call(getMaritalStatus);
  if (maritalStatus) refs['maritalStatus'] = maritalStatus;

  const natureOfWork = yield call(getNatureOfWork);
  if (natureOfWork) refs['natureOfWork'] = natureOfWork;

  const nationalities = yield call(getNationalities);
  if (nationalities) refs['nationalities'] = nationalities;

  const countries = yield call(getCountries);
  if (countries) refs['countries'] = countries;

  const signUpHost = yield call(getSignUpHost);
  if (signUpHost) refs['signUpHost'] = signUpHost;

  const currency = yield call(getCurrencies);
  if (currency) refs['currency'] = currency;

  const sourceOfFunds = yield call(getSourceOfFunds);
  if (sourceOfFunds) refs['sourceOfFunds'] = sourceOfFunds;

  yield delay(300);
  yield put(actions.getReferences(refs));
}

/**
 * Root saga manages watcher lifecycle
 */
export function* appSaga() {
  // Watches for  actions and calls the function associated with it when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.getClientTokenLoading.type, getRequestToken);
  yield takeLatest(actions.getLoadReferences.type, getUserReferences);
  yield takeLatest(actions.getLoadUserProfile.type, getLoggedInUserProfile);
}
