import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { request } from 'utils/request';

import spdCrypto from 'app/components/Helpers/EncyptDecrypt';

import { PassphraseState } from 'types/Default';
import { selectClientToken } from 'app/App/slice/selectors';
import { getRequestPassphrase } from 'app/App/slice/saga';

import { selectRequest } from './selectors';
import { componentActions as actions } from '.';
import { appActions } from 'app/App/slice';

/**
 * Global function for user data or other data
 */
function* getUpdatePassword() {
  yield delay(500);

  const token = yield select(selectClientToken);
  const payload: object = yield select(selectRequest);

  const requestURL = `${process.env.REACT_APP_API_URL}/auth/reset/password`;

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
    // Call our request helper (see 'utils/request')
    const apirequest = yield call(request, requestURL, options);

    if (apirequest && apirequest.data) {
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
      yield put(actions.getFetchError(newError));
    } else if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsUnauthenticated(true)); // client token is expired do not use when use is login, instead use session expired
      yield put(actions.getFetchError(false));
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
