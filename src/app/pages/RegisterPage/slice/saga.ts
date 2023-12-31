import { call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';

import spdCrypto from 'app/components/Helpers/EncyptDecrypt';

import { PassphraseState } from 'types/Default';
import { selectClientToken } from 'app/App/slice/selectors';
import {
  getRequestPassphrase,
  getResponsePassphrase,
} from 'app/App/slice/saga';

import { containerActions as actions } from '.';
import {
  selectRequest,
  selectValidateRequest,
  selectResendCodeRequest,
} from './selectors';
import { appActions } from 'app/App/slice';
import { analytics } from 'utils/firebase';
import { events } from 'utils/firebaseConstants';

/**
 * Register
 */
function* getRegisterAccount() {
  const token = yield select(selectClientToken);
  const payload = yield select(selectRequest);

  const requestURL = `${process.env.REACT_APP_API_URL}/auth/register`;

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
        yield put(actions.getFetchSuccess(true));
        analytics.logEvent(events.signup);
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
    } else if (err && err.response && err.response.status === 500) {
      yield put(appActions.getIsServerError(true));
      yield put(actions.getFetchReset());
    } else if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsUnauthenticated(true)); // client token is expired do not use when use is login, instead use session expired
      yield put(actions.getFetchError({}));
    } else {
      yield put(actions.getFetchError(err));
    }
  }
}

/**
 * Validate Email/Mobile and Password
 */
function* getValidateFields() {
  const token = yield select(selectClientToken);
  const payload = yield select(selectValidateRequest);

  const requestURL = `${process.env.REACT_APP_API_URL}/auth/register/validate`;

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
        yield put(actions.getValidateSuccess(true));
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
    // special case, check the 422 for invalid data (account already exists)
    if (err && err.response && err.response.status === 422) {
      const body = yield err.response.json();
      const newError = {
        code: 422,
        ...body,
      };
      yield put(actions.getValidateError(newError));
    } else if (err && err.response && err.response.status === 500) {
      yield put(appActions.getIsServerError(true));
      yield put(actions.getValidateReset());
    } else if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsUnauthenticated(true)); // client token is expired do not use when use is login, instead use session expired
      yield put(actions.getValidateError({}));
    } else {
      yield put(actions.getValidateError(err));
    }
  }
}

/**
 * Resend Activation Code
 * @returns
 */
function* getResendActivationCode() {
  const token = yield select(selectClientToken); // access_token
  const payload = yield select(selectResendCodeRequest); // payload body from main component
  const requestURL = `${process.env.REACT_APP_API_URL}/auth/resend/otp`; // url NOTE: change to resending activation code

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
      let decryptPhrase: PassphraseState = yield call(
        getResponsePassphrase,
        apirequest.data.id,
      );

      // decrypt payload data
      let decryptData = spdCrypto.decrypt(
        apirequest.data.payload,
        decryptPhrase.passPhrase,
      );

      yield put(actions.getResendCodeSuccess(decryptData));
    }
  } catch (err) {
    if (err && err.response && err.response.status === 422) {
      const body = yield err.response.json();
      const newError = {
        code: 422,
        ...body,
      };
      yield put(actions.getResendCodeError(newError));
    } else if (err && err.response && err.response.status === 500) {
      yield put(appActions.getIsServerError(true));
      yield put(actions.getResendCodeReset());
    } else if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsUnauthenticated(true)); // client token is expired do not use when use is login, instead use session expired
      yield put(actions.getResendCodeError({}));
    } else {
      yield put(actions.getResendCodeError(err));
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
  yield takeLatest(actions.getFetchLoading.type, getRegisterAccount);
  yield takeLatest(actions.getValidateLoading.type, getValidateFields);
  yield takeLatest(actions.getResendCodeLoading.type, getResendActivationCode);
}
