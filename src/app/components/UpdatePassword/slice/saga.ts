import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { request } from 'utils/request';

import CryptoJS from 'crypto-js';
import encDec from 'app/components/Helpers/EncyptDecrypt';

import { PassphraseState } from 'types/Default';
import { selectToken } from 'app/App/slice/selectors';
import { getRequestPassphrase } from 'app/App/slice/saga';

import { selectRequest } from './selectors';
import { componentActions as actions } from '.';

/**
 * Global function for user data or other data
 */
function* getUpdatePassword() {
  yield delay(500);

  const token = yield select(selectToken);
  const payload: object = yield select(selectRequest);

  const requestURL = `${process.env.REACT_APP_API_URL}/auth/reset/password`;

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
    // Call our request helper (see 'utils/request')
    const apirequest = yield call(request, requestURL, options);

    if (apirequest) {
      yield put(actions.getFetchSuccess(true));
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
      console.log(newError);
      yield put(actions.getFetchError(newError));
    } else {
      yield put(actions.getFetchError(err));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* componentSaga() {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.getFetchLoading.type, getUpdatePassword);
}
