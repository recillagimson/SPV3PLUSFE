// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { delay, call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { analytics } from 'utils/firebase';
import { events } from 'utils/firebaseConstants';

import spdCrypto from 'app/components/Helpers/EncyptDecrypt';

import { PassphraseState } from 'types/Default';
import { selectUserToken } from 'app/App/slice/selectors';
import {
  getRequestPassphrase,
  getResponsePassphrase,
} from 'app/App/slice/saga';

import { containerActions as actions } from '.';
import { selectAmount, selectBpiUrlToken, selectRequest } from './selectors';

function* addMoney() {
  yield delay(500);
  const token = yield select(selectUserToken);
  const payload = yield select(selectAmount);
  const requestURL = `${process.env.REACT_APP_API_URL}/bpi/login/url`;

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
  } catch (err: any) {
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

function* getAccessToken() {
  yield delay(500);
  const payloadToken = yield select(selectBpiUrlToken);
  const requestURL = `${process.env.REACT_APP_BURL}/oauth2/token`;
  const cid = process.env.REACT_APP_BCID || '';
  const cs = process.env.REACT_APP_BCS || '';

  const payload = new URLSearchParams();
  payload.append('client_id', cid);
  payload.append('client_secret', cs);
  payload.append('grant_type', 'authorization_code');
  payload.append('code', payloadToken);

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: payload,
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    if (apirequest) {
      yield put(actions.getAccessToken(apirequest.access_token));

      //Fetch Accounts
      yield delay(500);
      const token = yield select(selectUserToken);
      const requestURL = `${process.env.REACT_APP_API_URL}/bpi/accounts`;

      let encryptPayload: string = '';
      let requestPhrase: PassphraseState = yield call(getRequestPassphrase);
      if (requestPhrase && requestPhrase.id && requestPhrase.id !== '') {
        encryptPayload = spdCrypto.encrypt(
          JSON.stringify({ token: apirequest.access_token }),
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
      const accountsApirequest = yield call(request, requestURL, options);
      if (accountsApirequest) {
        // request decryption passphrase
        let decryptPhrase: PassphraseState = yield call(
          getResponsePassphrase,
          accountsApirequest.data.id,
        );
        // decrypt payload data
        let decryptData = spdCrypto.decrypt(
          accountsApirequest.data.payload,
          decryptPhrase.passPhrase,
        );

        if (decryptData) {
          yield put(actions.getFetchAccountsSuccess(decryptData));
        }
      } else {
        yield put(
          actions.getFetchError({
            error: true,
            message: 'An error has occured.',
          }),
        );
      }
    } else {
      yield put(
        actions.getFetchError({
          error: true,
          message: 'An error has occured.',
        }),
      );
    }
  } catch (err: any) {
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

function* fundTopUp() {
  yield delay(500);
  const token = yield select(selectUserToken);
  const payload = yield select(selectRequest);
  const requestURL = `${process.env.REACT_APP_API_URL}/bpi/fundtopup`;

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
        yield put(actions.getFetchFundTopUpSuccess(decryptData));
      }
    } else {
      yield put(
        actions.getFetchError({
          error: true,
          message: 'An error has occured.',
        }),
      );
    }
  } catch (err: any) {
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

function* processTopUp() {
  yield delay(500);
  const token = yield select(selectUserToken);
  const payload = yield select(selectRequest);
  const requestURL = `${process.env.REACT_APP_API_URL}/bpi/process`;

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
        yield put(actions.getFetchProcessTopUpSuccess(decryptData));
        analytics.logEvent(events.addMoney, { type: 'bpi' });
      }
    } else {
      yield put(
        actions.getFetchError({
          error: true,
          message: 'An error has occured.',
        }),
      );
    }
  } catch (err: any) {
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

function* resendOTP() {
  yield delay(500);
  const token = yield select(selectUserToken);
  const payload = yield select(selectRequest);
  const requestURL = `${process.env.REACT_APP_API_URL}/bpi/otp`;

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
        yield put(actions.getFetchResendOTPSuccess(decryptData));
      }
    } else {
      yield put(
        actions.getFetchError({
          error: true,
          message: 'An error has occured.',
        }),
      );
    }
  } catch (err: any) {
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
 * Root saga manages watcher lifecycle
 */
export function* containerSaga() {
  // Watches for  actions and calls the function associated with it when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.getFetchLoading.type, addMoney);
  yield takeLatest(actions.getFetchAccessTokenLoading.type, getAccessToken);
  yield takeLatest(actions.getFetchFundTopUpLoading.type, fundTopUp);
  yield takeLatest(actions.getFetchProcessTopUpLoading.type, processTopUp);
  yield takeLatest(actions.getFetchResendOTPLoading.type, resendOTP);
}
