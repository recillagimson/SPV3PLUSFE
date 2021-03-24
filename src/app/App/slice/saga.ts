import { call, select } from 'redux-saga/effects';
import { request } from 'utils/request';

import { selectToken } from './selectors';

/**
 * Global function for user data or other data
 */
export function* getRequestToken() {
  const config = {
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
    grant_type: 'client_credentials',
    scope: 'spv3-api IdentityServerApi',
  };

  const formBody: string[] = [];
  Object.keys(config).map(i =>
    formBody.push(`${encodeURIComponent(i)}=${encodeURIComponent(config[i])}`),
  );

  const requestURL = `${process.env.REACT_APP_API_URL}/connect/token`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody.join('&'),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    return apirequest;
  } catch (err) {
    return err;
  }
}

/**
 * Call to get passphrase
 * @return  {object}      Returns the result from the api call
 */
export function* getPassphrase() {
  // get the requested access token
  const token = yield select(selectToken);
  const requestURL = `${process.env.REACT_APP_API_URL}/api/payload/generate`;

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
 * @param {string}  id    encrypted data ID
 * @return {object}       Returns the result from the api call
 */
export function* getResponseKey(id) {
  const token = yield select(selectToken);
  const requestURL = `${
    process.env.REACT_APP_API_URL
  }/api/payload/${encodeURIComponent(id)}/key`;

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
  // yield takeLatest(actions.getFetchLoading.type, getRequestToken);
}
