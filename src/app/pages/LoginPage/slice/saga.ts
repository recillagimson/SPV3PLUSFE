import { call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';

import CryptoJS from 'crypto-js';
import encDec from 'app/components/Helpers/EncyptDecrypt';

import { PassphraseState } from 'types/Default';
import { appActions } from 'app/App/slice';
import { selectToken } from 'app/App/slice/selectors';
import {
  getRequestPassphrase,
  getResponsePassphrase,
} from 'app/App/slice/saga';

import { containerActions as actions } from '.';
import { selectRequest } from './selectors';

/**
 * Login
 */
export function* getLogin() {
  const token = yield select(selectToken); // access_token
  const payload = yield select(selectRequest); // payload body from main component
  const requestURL = `${process.env.REACT_APP_API_URL}/api/auth/login`; // url

  let encryptPayload: string = '';

  let requestPhrase: PassphraseState = yield call(getRequestPassphrase);

  if (requestPhrase && requestPhrase.id && requestPhrase.id !== '') {
    encryptPayload = CryptoJS.AES.encrypt(
      JSON.stringify(payload),
      requestPhrase.passPhrase,
      { format: encDec },
    ).toString();
  }

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.access_token}`,
    },
    body: JSON.stringify({ id: requestPhrase.id, payload: encryptPayload }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);

    if (apirequest && apirequest.id) {
      // request decryption passphrase
      let decryptPhrase: PassphraseState = yield call(
        getResponsePassphrase,
        apirequest.id,
      );

      // decrypt payload data
      let decryptData = CryptoJS.AES.decrypt(
        apirequest.payload,
        decryptPhrase.passPhrase,
        { format: encDec },
      ).toString(CryptoJS.enc.Utf8);

      yield put(appActions.getTokenSuccess(JSON.parse(decryptData))); // write the new access token
      yield put(appActions.getIsAuthenticated(true));
      yield put(actions.getFetchSuccess(true)); // return true on main component
    } else {
      yield put(
        actions.getFetchError({
          error: true,
          message: 'An error has occured.',
        }),
      );
    }
  } catch (err) {
    // code below is sample session expired to be used for logged in pages
    // if (err.response && err.response.status === 401) {
    // unauthorized code for invalid or expired access_token as per BE api
    // yield put(appActions.getIsSessionExpired(true));
    // return; // return immediately so we won't continue on the rest of the code
    // }

    yield put(actions.getFetchError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* containerSaga() {
  // Watches for  actions and calls the function associated with it when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.getFetchLoading.type, getLogin);
}
