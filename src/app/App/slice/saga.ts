import { call, select, takeLatest, put } from 'redux-saga/effects';
import { request } from 'utils/request';

import { getCookie, setCookie } from 'app/components/Helpers';

import { ClientTokenState } from 'types/Default';
import { appActions as actions } from '.';
import { selectToken } from './selectors';

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

  const requestURL = `${process.env.REACT_APP_API_URL}/api/clients/token`;

  const options = {
    method: 'POST',
    headers: {
      Accept: 'applications/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: payload,
  };

  try {
    const apirequest: ClientTokenState = yield call(
      request,
      requestURL,
      options,
    );

    if (apirequest && apirequest.expires_in) {
      const now = new Date();
      now.setSeconds(now.getSeconds() + apirequest.expires_in);
      setCookie('spv_expire', now.toUTCString(), 1);

      yield put(actions.getTokenSuccess(apirequest));
    }

    if (apirequest && apirequest.errors) {
      yield put(actions.getTokenError(apirequest));
    }

    return apirequest;
  } catch (err) {
    yield put(actions.getTokenError(err));
    return err;
  }
}

/**
 * Call to get passphrase
 * @return  {object}      Returns the result from the api call
 */
export function* getRequestPassphrase() {
  let token: any;

  // check if we have a cookie set
  const spvExpireCookie = getCookie('spv_expire');
  if (spvExpireCookie && spvExpireCookie !== '') {
    const now = new Date();
    const tokenExpire = new Date(spvExpireCookie);
    if (now.getTime() > tokenExpire.getTime()) {
      token = yield call(getRequestToken);
    } else {
      token = yield select(selectToken);
    }
  } else {
    token = yield select(selectToken);
  }

  console.log(token);
  const requestURL = `${process.env.REACT_APP_API_URL}/api/payloads/generate`;

  const options = {
    method: 'GET',
    headers: {
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
 * Get a response key
 * @param {string}  id    request passphrase id
 * @return {object}       Returns the result from the api call
 */
export function* getResponsePassphrase(id: string) {
  const token = yield select(selectToken);
  const requestURL = `${process.env.REACT_APP_API_URL}/api/payloads/${id}/key`;

  const options = {
    method: 'GET',
    headers: {
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
 * Root saga manages watcher lifecycle
 */
export function* appSaga() {
  // Watches for  actions and calls the function associated with it when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.getTokenLoading.type, getRequestToken);
}
