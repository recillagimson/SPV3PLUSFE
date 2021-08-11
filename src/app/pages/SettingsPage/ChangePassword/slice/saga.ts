import { call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';

import spdCrypto from 'app/components/Helpers/EncyptDecrypt';

import { PassphraseState } from 'types/Default';
import { selectUserToken } from 'app/App/slice/selectors';
import {
  getRequestPassphrase,
  getResponsePassphrase,
} from 'app/App/slice/saga';
import { appActions } from 'app/App/slice';

import { containerActions as actions } from '.';
import { selectRequest, selectValidateRequest } from './selectors';

/**
 * Change Password
 */
function* getChangePassword() {
  const token = yield select(selectUserToken);
  const payload = yield select(selectRequest);

  const requestURL = `${process.env.REACT_APP_API_URL}/user/password`;

  let encryptPayload: string = '';

  let requestPhrase: PassphraseState = yield call(getRequestPassphrase);

  if (requestPhrase && requestPhrase.id && requestPhrase.id !== '') {
    encryptPayload = spdCrypto.encrypt(
      JSON.stringify(payload),
      requestPhrase.passPhrase,
    );
  }

  const options = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.access_token}`,
    },
    body: JSON.stringify({ id: requestPhrase.id, payload: encryptPayload }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);

    if (apirequest && apirequest.data && apirequest.data.id) {
      yield put(actions.getFetchSuccess(true));
    }
  } catch (err) {
    // special case, check the 422 for invalid data (account already exists)
    if (err && err.response && err.response.status === 422) {
      const body = yield err.response.json();
      const newError = {
        code: 422,
        ...body,
      };
      yield put(actions.getFetchError(JSON.stringify(newError)));
    } else if (err && err.response && err.response.status === 500) {
      yield put(appActions.getIsServerError(true));
      yield put(actions.getFetchReset());
    } else if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsSessionExpired(true));
      yield put(actions.getFetchReset());
    } else {
      yield put(actions.getFetchError(JSON.stringify(err)));
    }
  }
}

/**
 * Validate Change Password
 */
function* getValidatePassword() {
  const token = yield select(selectUserToken);
  const payload = yield select(selectValidateRequest);

  const requestURL = `${process.env.REACT_APP_API_URL}/user/password/validate`;

  let encryptPayload: string = '';

  let requestPhrase: PassphraseState = yield call(getRequestPassphrase);

  if (requestPhrase && requestPhrase.id && requestPhrase.id !== '') {
    encryptPayload = spdCrypto.encrypt(
      JSON.stringify(payload),
      requestPhrase.passPhrase,
    );
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

    if (apirequest && apirequest.data && apirequest.data.id) {
      // request decryption passphrase
      let decryptPhrase: PassphraseState = yield call(
        getResponsePassphrase,
        apirequest.data.id,
      );

      // decrypt payload data
      let decryptData = spdCrypto.decrypt(
        apirequest.data.payload,
        decryptPhrase.passPhrase,
      );

      if (decryptData) {
        yield put(actions.getValidateSuccess(true));
      }
    }
  } catch (err) {
    // special case, check the 422 for invalid data (account already exists)
    if (err && err.response && err.response.status === 422) {
      const body = yield err.response.json();
      const newError = {
        code: 422,
        ...body,
      };
      yield put(actions.getValidateError(JSON.stringify(newError)));
    } else if (err && err.response && err.response.status === 500) {
      yield put(appActions.getIsServerError(true));
      yield put(actions.getValidateReset());
    } else if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsSessionExpired(true));
      yield put(actions.getValidateReset());
    } else {
      yield put(actions.getValidateError(JSON.stringify(err)));
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
  yield takeLatest(actions.getFetchLoading.type, getChangePassword);
  yield takeLatest(actions.getValidateLoading.type, getValidatePassword);
}
