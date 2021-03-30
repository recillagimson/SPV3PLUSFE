import { delay, call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';

import CryptoJS from 'crypto-js';
import encDec from 'app/components/Helpers/EncyptDecrypt';

import { PassphraseState } from 'types/Default';
import { selectToken } from 'app/App/slice/selectors';
import {
  getRequestPassphrase,
  getResponsePassphrase,
} from 'app/App/slice/saga';

import { containerActions as actions } from '.';
import { selectRequest, selectVerifyRequest } from './selectors';

/**
 * ForgotPassword
 */
function* getForgotPassword() {
  yield delay(500);
  const token = yield select(selectToken);
  const payload = yield select(selectRequest);

  const requestURL = `${process.env.REACT_APP_API_URL}/api/auth/forgot/password`;

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
    if (apirequest) {
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

      /**
       * sample payload response if registration is successful
       * {"email":"rcervantes@exceture.com","id":"68ec005a-4440-401a-bcfa-235efa1a24f8","updated_at":"2021-03-29T10:20:52.000000Z","created_at":"2021-03-29T10:20:52.000000Z"}
       */

      if (decryptData) {
        yield put(actions.getFetchSuccess(true));
      }
    } else {
      yield put(
        actions.getFetchError({
          error: true,
          message: 'An error has occured.',
        }),
      );
    }
  } catch (err) {
    // special case, check the 422 for invalid data (account already exists)
    if (err && err.response && err.response.status === 422) {
      const body = yield err.response.json();
      const newError = {
        code: 422,
        ...body,
      };
      yield put(actions.getFetchError(newError));
    } else {
      yield put(actions.getFetchError(err));
    }
  }
}

/**
 * Verify Code
 */
function* getVerifyCode() {
  yield delay(500);

  const token = yield select(selectToken);
  const payload = yield select(selectVerifyRequest);

  const requestURL = `${process.env.REACT_APP_API_URL}/api/auth/verify`;

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
    if (apirequest) {
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

      if (decryptData) {
        yield put(actions.getVerifySuccess(true));
      }
    } else {
      yield put(
        actions.getVerifyError({
          error: true,
          message: 'An error has occured.',
        }),
      );
    }
  } catch (err) {
    // special case, check the 422 for invalid data (account already exists)
    if (err && err.response && err.response.status === 422) {
      const body = yield err.response.json();
      const newError = {
        code: 422,
        ...body,
      };
      yield put(actions.getVerifyError(newError));
    } else {
      yield put(actions.getVerifyError(err));
    }
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
  yield takeLatest(actions.getFetchLoading.type, getForgotPassword);
  yield takeLatest(actions.getVerifyLoading.type, getVerifyCode);
}
