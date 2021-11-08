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
import { selectAmount, selectCode } from './selectors';

function* addMoney() {
  yield delay(500);
  const token = yield select(selectUserToken);
  const payload = yield select(selectAmount);
  const requestURL = `${process.env.REACT_APP_API_URL}/cashin/ubp`;

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
        analytics.logEvent(events.addMoney, { type: 'ubp' });
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

function* generateUbpAuthorizeUrl() {
  yield delay(500);
  const token = yield select(selectUserToken);
  const requestURL = `${process.env.REACT_APP_API_URL}/ubp/auth/generate`;

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.access_token}`,
    },
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    if (apirequest) {
      let decryptPhrase: PassphraseState = yield call(
        getResponsePassphrase,
        apirequest.data.id,
      );

      let decryptData = spdCrypto.decrypt(
        apirequest.data.payload,
        decryptPhrase.passPhrase,
      );

      if (decryptData) {
        yield put(actions.getGenerateAuthUrlSuccess(decryptData));
      }
    } else {
      yield put(
        actions.getGenerateAuthUrlError({
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
      yield put(actions.getGenerateAuthUrlError(newError));
    } else {
      yield put(actions.getGenerateAuthUrlError(err));
    }
  }
}

function* linkAccount() {
  yield delay(500);
  const token = yield select(selectUserToken);
  const payload = yield select(selectCode);
  const requestURL = `${process.env.REACT_APP_API_URL}/ubp/auth/account/link`;

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
        yield put(actions.getLinkAccountSuccess(decryptData));
        analytics.logEvent(events.addMoney, { type: 'ubp' });
      }
    } else {
      yield put(
        actions.getLinkAccountError({
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
      yield put(actions.getLinkAccountError(newError));
    } else {
      yield put(actions.getLinkAccountError(err));
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
  yield takeLatest(actions.getLinkAccountLoading.type, linkAccount);
  yield takeLatest(
    actions.getGenerateAuthUrlLoading.type,
    generateUbpAuthorizeUrl,
  );
}
