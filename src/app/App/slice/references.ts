import { call, select, delay } from 'redux-saga/effects';
import { request } from 'utils/request';

import spdCrypto from 'app/components/Helpers/EncyptDecrypt';

import { PassphraseState } from 'types/Default';
import { selectClientToken } from './selectors';
import { getResponsePassphrase } from './saga';

/**
 * Collection on API calls for references
 * Add here and call the function in the saga
 * NOTE: make sure to return the decrypted payload response
 *       if error is encountered, return a null or false value;
 */
export function* getMaritalStatus() {
  yield delay(500);
  const token = yield select(selectClientToken);
  const requestURL = `${process.env.REACT_APP_API_URL}/marital_status`;

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
      let decryptData = yield spdCrypto.decrypt(
        apirequest.data.payload,
        decryptPhrase.passPhrase,
      );

      return decryptData;
    }
  } catch (err) {
    return false;
  }
}

export function* getNatureOfWork() {
  yield delay(500);
  const token = yield select(selectClientToken);
  const requestURL = `${process.env.REACT_APP_API_URL}/nature_of_work`;

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
      let decryptData = yield spdCrypto.decrypt(
        apirequest.data.payload,
        decryptPhrase.passPhrase,
      );

      return decryptData;
    }
  } catch (err) {
    return false;
  }
}

export function* getNationalities() {
  yield delay(500);
  const token = yield select(selectClientToken);
  const requestURL = `${process.env.REACT_APP_API_URL}/nationality`;

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
      let decryptData = yield spdCrypto.decrypt(
        apirequest.data.payload,
        decryptPhrase.passPhrase,
      );

      return decryptData;
    }
  } catch (err) {
    return false;
  }
}

export function* getCountries() {
  yield delay(500);
  const token = yield select(selectClientToken);
  const requestURL = `${process.env.REACT_APP_API_URL}/country`;

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
      let decryptData = yield spdCrypto.decrypt(
        apirequest.data.payload,
        decryptPhrase.passPhrase,
      );

      return decryptData;
    }
  } catch (err) {
    return false;
  }
}

export function* getSignUpHost() {
  yield delay(500);
  const token = yield select(selectClientToken);
  const requestURL = `${process.env.REACT_APP_API_URL}/signup_host`;

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
      let decryptData = yield spdCrypto.decrypt(
        apirequest.data.payload,
        decryptPhrase.passPhrase,
      );

      return decryptData;
    }
  } catch (err) {
    return false;
  }
}

export function* getCurrencies() {
  yield delay(500);
  const token = yield select(selectClientToken);
  const requestURL = `${process.env.REACT_APP_API_URL}/currency`;

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
      let decryptData = yield spdCrypto.decrypt(
        apirequest.data.payload,
        decryptPhrase.passPhrase,
      );

      return decryptData;
    }
  } catch (err) {
    return false;
  }
}

export function* getSourceOfFunds() {
  yield delay(500);
  const token = yield select(selectClientToken);
  const requestURL = `${process.env.REACT_APP_API_URL}/source_of_fund`;

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
      let decryptData = yield spdCrypto.decrypt(
        apirequest.data.payload,
        decryptPhrase.passPhrase,
      );

      return decryptData;
    }
  } catch (err) {
    return false;
  }
}
