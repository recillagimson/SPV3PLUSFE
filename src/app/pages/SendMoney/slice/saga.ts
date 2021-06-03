import { delay, call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';

import spdCrypto from 'app/components/Helpers/EncyptDecrypt';

import { PassphraseState } from 'types/Default';
import { appActions } from 'app/App/slice';
import { selectUserToken } from 'app/App/slice/selectors';
import {
  getRequestPassphrase,
  getResponsePassphrase,
} from 'app/App/slice/saga';

import { containerActions as actions } from '.';
import {
  selectRequest,
  selectValidateRequest,
  selectGenerateRequest,
} from './selectors';

function* validateSendMoney() {
  yield delay(500);
  const token = yield select(selectUserToken);
  const payload = yield select(selectValidateRequest);

  const requestURL = `${process.env.REACT_APP_API_URL}/send/money/validate`;

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
    if (apirequest) {
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
        yield put(actions.getValidateSuccess(decryptData));
      }
    } else {
      yield put(
        actions.getValidateError({
          error: true,
          message: 'An error has occured.',
        }),
      );
    }
  } catch (err) {
    if (err && err.response && err.response.status === 422) {
      const body = yield err.response.json();
      const newError = {
        code: 422,
        ...body,
      };
      yield put(actions.getValidateError(newError));
    } else if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsSessionExpired(true));
      yield put(actions.getValidateReset());
    } else {
      yield put(actions.getValidateError(err));
    }
  }
}

/**
 * SendMoney
 */
function* getSendMoney() {
  yield delay(500);
  const token = yield select(selectUserToken);
  const payload = yield select(selectRequest);

  const requestURL = `${process.env.REACT_APP_API_URL}/send/money`;

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
    // if (apirequest && apirequest.data) {
    //   yield put(actions.getFetchSuccess(true));
    // }
    if (apirequest) {
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
        yield put(actions.getFetchSuccess(decryptData));
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
    if (err && err.response && err.response.status === 422) {
      const body = yield err.response.json();
      const newError = {
        code: 422,
        ...body,
      };
      yield put(actions.getFetchError(newError));
    } else if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsSessionExpired(true));
      yield put(actions.getValidateReset());
    } else {
      yield put(actions.getFetchError(err));
    }
  }
}

function* generateCode() {
  yield delay(500);
  const token = yield select(selectUserToken);
  const payload = yield select(selectGenerateRequest);

  const requestURL = `${process.env.REACT_APP_API_URL}/auth/generate/otp`;

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

    if (apirequest) {
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
        yield put(actions.getGenerateSuccess(true));
      }
    } else {
      yield put(
        actions.getGenerateError({
          error: true,
          message: 'An error has occured.',
        }),
      );
    }
  } catch (err) {
    if (err && err.response && err.response.status === 422) {
      const body = yield err.response.json();
      const newError = {
        code: 422,
        ...body,
      };
      yield put(actions.getGenerateError(newError));
    } else if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsSessionExpired(true));
      yield put(actions.getGenerateReset());
    } else {
      yield put(actions.getGenerateError(err));
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
  yield takeLatest(actions.getValidateLoading.type, validateSendMoney);
  yield takeLatest(actions.getFetchLoading.type, getSendMoney);
  yield takeLatest(actions.getGenerateLoading.type, generateCode);
}
